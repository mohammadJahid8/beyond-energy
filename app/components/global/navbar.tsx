"use client";

import { Sheet, SheetTrigger, SheetContent, SheetClose } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, ChevronRight, Globe, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "solutions", href: "#" },
  { name: "product", href: "#" },
  { name: "pricing", href: "#" },
  { name: "resources", href: "#" },
  { name: "about", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-primary text-secondary px-5 md:px-16 py-3 flex items-center justify-between border-b border-secondary">
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
            className="hover:underline font-light"
          >
            {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
          </Link>
        ))}
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
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="size-6" />
                  </Button>
                </SheetClose>
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
              {/* My account at the bottom */}
              <div className="px-4 py-4 border-t border-secondary/30">
                <Button
                  variant="ghost"
                  className="w-full text-left text-secondary"
                >
                  My account
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
