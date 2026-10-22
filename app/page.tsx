import Header from "@/components/Header";
import ProductSlider from "@/components/ProductSlider";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Products from "@/components/Products";
import AboutPens from "@/components/AboutPens";
import Comparison from "@/components/Comparison";
import WhoUses from "@/components/WhoUses";
import Delivery from "@/components/Delivery";
import MoreProducts from "@/components/MoreProducts";
import WhyAtlas from "@/components/WhyAtlas";
import FAQ from "@/components/FAQ";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import ShopProvider from "@/components/ShopProvider";
import { getShopOffers } from "@/lib/shop-data";

// The whole website is this one page. Each line below is one section,
// in the order visitors see them. Open a component to edit that section.
// The page is built ahead of time and rebuilt in the background every 10 minutes
// (SHOP_REFRESH_SECONDS in lib/shop-data.ts), so it shows the online shop's current prices.
export default async function Home() {
  const offers = await getShopOffers();

  return (
    <ShopProvider offers={offers}>
      <Header />

      <main id="main">
        <ProductSlider />
        <Hero />
        <Intro />
        <Products />
        <AboutPens />
        <Comparison />
        <WhoUses />
        <Delivery />
        <MoreProducts />
        <WhyAtlas />
        <FAQ />
        <WhatsAppCTA />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </ShopProvider>
  );
}
