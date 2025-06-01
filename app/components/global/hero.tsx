import React from "react";
import Container from "./container";
import Title from "./title";

export default function Hero() {
  return (
    <Container className="w-full py-32">
      <Title level={2} className="text-primary mb-4">
        Dial in the light
      </Title>
      <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl">
        See how your design interacts with{" "}
        <span className="font-semibold text-primary-foreground">
          natural light
        </span>{" "}
        at different{" "}
        <span className="font-semibold text-primary-foreground">
          times of day
        </span>{" "}
        to refine your design with clarity and precision. Quickly add and adjust
        artificial lighting with{" "}
        <span className="font-semibold text-primary-foreground">
          point, spot, area, and line lights
        </span>
        .
      </p>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8">
        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-4">
          <video
            src="https://assets.lumion.com/f/180614/x/493e65d934/view-lights-animation-tower-square.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
        <div className="rounded-md overflow-hidden w-full bg-muted flex items-center justify-center md:col-span-6">
          <video
            src="https://assets.lumion.com/f/180614/x/8812d0a76d/sun-study-view-no-graphics.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </Container>
  );
}
