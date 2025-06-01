"use client";

import React from "react";
import Container from "./container";
import Title from "./title";

const For: React.FC = () => {
  const items = [
    {
      title: "Architectural design",
      description:
        "Bring your structures to life with the greatest ease, in the highest quality",
    },
    {
      title: "Interior design",
      description:
        "Visualize interior spaces as if they are ready to be lived or worked in",
    },
    {
      title: "Urban planning",
      description: "Show how communities will experience your urban designs",
    },
    {
      title: "Education",
      description: "Lumion is free for students and faculties around the world",
    },
  ];

  return (
    <Container className="bg-primary text-secondary py-20">
      <Title level={2} className="mb-20">
        Beyond Energy Design for
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {items.map((item, idx) => (
          <div key={idx} className="border-b border-secondary pb-4">
            <Title level={4} className="mb-6">
              {item.title}
            </Title>
            <p className="text-base md:text-lg text-secondary">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default For;
