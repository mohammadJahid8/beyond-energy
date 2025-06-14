"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Button } from "../ui/button";
import Navbar from "./navbar";
import { MoveRight } from "lucide-react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Banner() {
  const container = useRef<HTMLDivElement>(null);
  const titleLine1 = useRef<HTMLHeadingElement>(null);
  const titleLine2 = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Background reveal
      tl.fromTo(
        container.current,
        {
          clipPath: "ellipse(0% 0% at 0% 0%)",
        },
        {
          clipPath: "ellipse(150% 150% at 0% 0%)",
          duration: 1.4,
          ease: "power2.out",
        }
      );

      // Title animation line-by-line
      tl.fromTo(
        titleLine1.current,
        { text: "" },
        {
          text: "Discover Design",
          duration: 1.2,
          ease: "power1.inOut",
        }
      ).fromTo(
        titleLine2.current,
        { text: "" },
        {
          text: "Proposals",
          duration: 1,
          ease: "power1.inOut",
        },
        "<+0.4"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.prod.website-files.com/677c7ce427a647ef7b9614a9%2F68471cd39105ac1f6b8dffe9_Untitled%20design%20%281%29%20%281%29-transcode.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col justify-center text-white px-5 md:pl-16 md:pr-0 py-20 md:py-40">
          <span className="text-lg font-semibold mb-2 text-new">New</span>
          <ContainerTextFlip
            className="pb-10"
            words={["Discover Design Proposals", "Available for SketchUp"]}
          />
          {/* <h1
            ref={titleLine1}
            className="text-title text-5xl md:text-8xl font-bold leading-tight mb-1"
          ></h1>
          <h1
            ref={titleLine2}
            className="text-title text-5xl md:text-8xl font-bold leading-tight mb-4"
          ></h1> */}
          <p className="text-lg md:text-3xl mb-6 max-w-lg font-light text-description">
            Explore, refine, visualize—right inside your modeling tool. Now
            available for SketchUp.
          </p>
          <Button className="bg-white dark:bg-accent dark:text-white text-lg !px-10 py-6 w-max inline-flex items-center gap-4">
            Get Started
            <MoveRight className="w-7 h-7" />
          </Button>
        </div>
      </div>
    </section>
  );
}
