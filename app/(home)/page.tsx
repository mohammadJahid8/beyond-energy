import Banner from "../components/global/banner";
import Clients from "../components/global/clients";
import Comparison from "../components/global/comparision";
import Contact from "../components/global/contact";
import ContactCta from "../components/global/contact-cta";
import FadeOnScrollSection from "../components/global/fade";
import Faqs from "../components/global/faqs";
import For from "../components/global/for";
import Gallery from "../components/global/gallery";
import Hero from "../components/global/hero";
import How from "../components/global/how";
import How2 from "../components/global/how-2";
import Footer from "../components/global/footer";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Banner />
      <FadeOnScrollSection />
      <Hero />
      <How />
      <How2 />
      <Comparison />
      <ContactCta />
      <Gallery />
      <For />
      <Clients />
      <Faqs />
      <Contact />
      <Footer />
    </div>
  );
}
