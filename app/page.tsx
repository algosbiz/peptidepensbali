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

// The whole website is this one page. Each line below is one section,
// in the order visitors see them. Open a component to edit that section.
export default function Home() {
  return (
    <>
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
    </>
  );
}
