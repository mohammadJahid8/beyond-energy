"use client";

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
import { useState } from "react";
import { useEffect } from "react";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50`}
      >
        <img src="/beyond-logo.png" alt="Loading" className="w-48 h-auto" />
      </div>
    );
  }

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
