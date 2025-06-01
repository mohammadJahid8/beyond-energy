"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "./container";
import Title from "./title";

const FadeHoldText: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.6, 0.75, 1],
    [0, 0.05, 1, 1, 0.05, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.95, 1, 1, 1, 0.05]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.6, 0.75, 1],
    [50, 25, 0, 0, -25, -50]
  );

  return (
    <Container className="relative z-0">
      {/* Scroll-tracked Section */}
      <div ref={sectionRef} className="relative z-10">
        <motion.div
          style={{ opacity, scale, y: translateY }}
          className="sticky top-0 py-32 px-4 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm"
        >
          <div className="text-center">
            <Title
              level={2}
              className="text-5xl md:text-7xl font-medium text-primary leading-tight"
            >
              Lorem ipsum dolor sit amet elit.
            </Title>
            <p className="mt-6 text-xl md:text-2xl text-primary max-w-3xl font-light mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </motion.div>

        {/* Spacer to allow scroll room */}
        <div className="h-[60vh]" />
      </div>

      {/* ✅ Image scrolls into view under/behind text */}
      <div className="relative z-10 -mt-32">
        <img
          src="https://assets.lumion.com/f/180614/1920x1080/7acebde98b/expressway-road.jpg/m/1920x0"
          alt="Expressway Road"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </Container>
  );
};

export default FadeHoldText;
