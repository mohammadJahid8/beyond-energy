import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Title from "./title";
import Container from "./container";

export default function Footer() {
  const siteMapLinks = [
    "Home",
    "About",
    "Products",
    "Product/Design",
    "Services",
    "Going Solar",
    "Careers",
    "Contact Us",
  ];

  const resourceLinks = [
    "Why Go Solar",
    "Education",
    "How Solar Panels Work",
    "FAQs",
    "Warranty",
    "Get a Quote",
    "Refer a Friend",
  ];

  const contactInfo = [
    "3160 South Valley View Blvd.",
    "Suite 106, Las Vegas, NV, 89102",
    "702-983-2156",
    "info@beyondenergycompany.com",
  ];

  return (
    <footer className="bg-primary text-secondary">
      <Container className="pb-12 pt-20">
        {/* Top section with logo, links, and contact */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/beyond-logo.png"
                alt="Lumion logo"
                width={170}
                height={170}
              />
            </Link>
            <p className="text-secondary text-base pt-4 leading-relaxed">
              We&apos;re local veterans helping Las Vegas homeowners switch to
              solar. Simple process, honest pricing, real support.
            </p>
          </div>

          {/* Site Map */}
          <div>
            <Title level={6} className="mb-4">
              Site Map
            </Title>
            <div className="space-y-2">
              {siteMapLinks.map((link, index) => (
                <Link
                  key={index}
                  href="#"
                  className="block text-secondary hover:text-white text-sm md:text-base font-light transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <Title level={6} className="mb-4">
              Resources
            </Title>
            <div className="space-y-2">
              {resourceLinks.map((link, index) => (
                <Link
                  key={index}
                  href="#"
                  className="block text-secondary hover:text-white text-sm md:text-base font-light transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <Title level={6} className="mb-4">
              Contact
            </Title>
            <div className="space-y-2 text-sm md:text-base font-light text-secondary">
              {contactInfo.map((info, index) => (
                <div key={index}>{info}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle section with tagline and buttons */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 py-8 border-t border-secondary">
          <div className="lg:max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              Making it easier to switch to solar, accelerating the shift to
              sustainable living.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent px-8"
            >
              Our Products
            </Button>
            <Button
              size="lg"
              className="bg-secondary text-primary hover:text-white px-8"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-secondary">
          <p className="text-secondary text-sm">
            Copyright © 2025 Beyond Energy Company. All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}
