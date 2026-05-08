// Single-page layout — sections stacked vertically in scroll order.
// All content is driven by portfolio.config.ts, components have no hardcoded data.
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}
