// TALKING TO CLOUDFLARE
// GitHub runs this after every deployment (.github/workflows/cloudflare-cache.yml).
// You can also run it on your computer:
//
//   npm run cloudflare:purge   empty Cloudflare's copies of the website
//   npm run cloudflare:rules   send the rules in cloudflare/cache-rules.mjs to Cloudflare
//   npm run cloudflare:check   show the rules Cloudflare has now and test a few addresses
//
// It needs two values. GitHub keeps them as repository secrets; on your computer, put them
// in a file called .env.local (it is never uploaded):
//   CLOUDFLARE_API_TOKEN=...   an API token with "Zone - Cache Purge - Purge" and "Zone - Cache Rules - Edit"
//   CLOUDFLARE_ZONE_ID=...     the Zone ID on the domain's Overview page in Cloudflare
// "check" works without them too (it then only tests the addresses).

import { cacheRules, RULE_PREFIX, SITE_HOST } from "./cache-rules.mjs";

const API = "https://api.cloudflare.com/client/v4";
const PHASE = "http_request_cache_settings";
const token = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;

// Sends one request to Cloudflare's API. Tries up to 3 times when Cloudflare is busy
// (429 = too many requests, 5xx = a problem on their side).
async function cloudflare(method, path, body) {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(`${API}/zones/${zoneId}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.success) return data.result;

    const retry = response.status === 429 || response.status >= 500;
    if (retry && attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 15_000));
      continue;
    }
    const reasons = (data.errors ?? []).map((error) => `${error.code}: ${error.message}`).join("; ");
    const error = new Error(`Cloudflare answered ${response.status} to ${method} ${path}. ${reasons}`);
    error.status = response.status;
    throw error;
  }
}

// Empties Cloudflare's copies of everything on the website, with and without www.
async function purge() {
  const hosts = [SITE_HOST, `www.${SITE_HOST}`];
  await cloudflare("POST", "/purge_cache", { hosts });
  console.log(`Cloudflare's cache is empty for ${hosts.join(" and ")}.`);
}

// The cache rules that are in Cloudflare right now ([] if there are none yet).
async function currentRules() {
  try {
    return (await cloudflare("GET", `/rulesets/phases/${PHASE}/entrypoint`)).rules ?? [];
  } catch (error) {
    if (error.status === 404) return [];
    throw error;
  }
}

// Replaces this website's rules in Cloudflare with the ones in cache-rules.mjs.
// Rules somebody made by hand in the dashboard are kept, after ours, so they still win.
async function rules() {
  const handMade = (await currentRules())
    .filter((rule) => !rule.ref?.startsWith(RULE_PREFIX))
    .map((rule) => {
      // "version" and "last_updated" are filled in by Cloudflare and can't be sent back.
      const copy = { ...rule };
      delete copy.version;
      delete copy.last_updated;
      return copy;
    });

  const saved = await cloudflare("PUT", `/rulesets/phases/${PHASE}/entrypoint`, {
    rules: [...cacheRules, ...handMade],
  });
  console.log(`Cloudflare now has ${saved.rules.length} cache rule(s):`);
  for (const rule of saved.rules) console.log(`  - ${rule.description || rule.ref}`);
}

// Asks for an address twice and prints what Cloudflare did (HIT = served from its copy).
async function test(path, headers = {}) {
  const statuses = [];
  for (let i = 0; i < 2; i++) {
    const response = await fetch(`https://${SITE_HOST}${path}`, { headers });
    await response.arrayBuffer();
    statuses.push(response.headers.get("cf-cache-status") ?? "none");
  }
  console.log(`  ${statuses.join(" -> ").padEnd(16)} ${path}`);
}

async function check() {
  if (token && zoneId) {
    const rules = await currentRules();
    console.log(`Cache rules in Cloudflare (${rules.length}):`);
    for (const rule of rules) console.log(`  - ${rule.description || rule.ref}`);
  }

  // Finds one code file and one resized photo in the live page to test with.
  const html = await (await fetch(`https://${SITE_HOST}/`)).text();
  const codeFile = html.match(/\/_next\/static\/[^"']+\.js/)?.[0];
  const photo = html.match(/\/_next\/image\?url=[^"'\s]+/)?.[0]?.replaceAll("&amp;", "&");

  console.log(`Cloudflare cache status (first request -> second request):`);
  await test("/");
  await test("/robots.txt");
  if (codeFile) await test(codeFile);
  if (photo) await test(photo, { Accept: "image/avif,image/webp,*/*" });
}

const tasks = { purge, rules, check };
const name = process.argv[2];
const task = tasks[name];

if (!task) {
  console.error("Usage: node cloudflare/cloudflare.mjs purge | rules | check");
  process.exit(1);
}
if (name !== "check" && !(token && zoneId)) {
  const message =
    "CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID are not set, so Cloudflare was not contacted. " +
    "See \"Cloudflare cache\" in README.md.";
  // On GitHub this is a warning instead of a failure, so deployments don't show a red cross
  // before the secrets have been added.
  if (process.env.GITHUB_ACTIONS) {
    console.log(`::warning::${message}`);
    process.exit(0);
  }
  console.error(message);
  process.exit(1);
}

await task();
