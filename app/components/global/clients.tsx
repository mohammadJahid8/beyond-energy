"use client";

import React from "react";
import Container from "./container";
import Title from "./title";

const Clients: React.FC = () => {
  const logos = [
    {
      name: "Revit",
      src: "https://assets.lumion.com/f/180614/x/74a034d2bf/revit-logo.svg",
    },
    {
      name: "Archicad",
      src: "https://assets.lumion.com/f/180614/x/698ea96610/archicad-logo.svg",
    },
    {
      name: "Rhino",
      src: "https://assets.lumion.com/f/180614/x/9dda56b0ef/rhino-logo.svg",
    },
    {
      name: "Autocad",
      src: "https://assets.lumion.com/f/180614/x/fb0960979a/autocad-logo.svg",
    },
    {
      name: "Vectorworks",
      src: "https://assets.lumion.com/f/180614/x/a1f9fd43c3/vectorworks-logo.svg",
    },
  ];

  return (
    <Container className="py-20 text-primary dark:text-primary-foreground text-center">
      <Title level={2} className="mb-3">
        Complete compatibility
      </Title>
      <p className="md:text-lg mb-12">
        Model and render in real time with Beyond Energy LiveSync
      </p>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo.src}
            alt={logo.name}
            className="h-10 md:h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        ))}
      </div>
    </Container>
  );
};

export default Clients;
