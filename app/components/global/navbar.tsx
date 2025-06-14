"use client";

import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, ChevronRight, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ui/layout/ThemeToggle/theme-toggle";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "solutions", href: "#" },
  { name: "product", href: "#" },
  { name: "pricing", href: "#" },
  { name: "resources", href: "#" },
  { name: "about", href: "#" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full bg-transparent text-white px-5 md:px-16 py-3 flex items-center justify-between sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? "" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Image
          src="/beyond-logo.png"
          alt="Lumion logo"
          width={130}
          height={130}
        />
      </div>
      {/* Desktop nav */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:underline text-lg"
          >
            {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
          </Link>
        ))}
        <ModeToggle />
      </div>
      {/* Mobile nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 bg-primary text-secondary">
            <div className="flex flex-col h-full">
              {/* Header with logo and close icon */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-secondary/30">
                <Image
                  src="/beyond-logo.png"
                  alt="Lumion logo"
                  width={100}
                  height={100}
                />
              </div>
              {/* Nav links */}
              <div className="flex-1 flex flex-col gap-1 px-2 py-4">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-md text-base font-medium hover:bg-secondary/10 transition-colors ${
                      idx === 3 ? "text-white font-semibold" : "text-secondary"
                    }`}
                  >
                    <span>
                      {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                    </span>
                    <ChevronRight className="size-5" />
                  </Link>
                ))}
                {/* Language selector */}
                <button className="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium hover:bg-secondary/10 transition-colors text-secondary">
                  <span className="flex items-center gap-2">
                    <Globe className="size-5 mr-2" />
                    English
                  </span>
                  <ChevronRight className="size-5" />
                </button>
              </div>
              {/* Theme toggle at the bottom */}
              <div className="px-4 py-4 border-t border-secondary/30 flex justify-center">
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
