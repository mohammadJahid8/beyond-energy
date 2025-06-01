"use client";
import React from "react";
import Container from "./container";
import Title from "./title";
import ReactCompareImage from "react-compare-image";

const Comparison = () => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-5 text-primary w-full overflow-hidden my-24">
      <div className="col-span-2 flex flex-col justify-center px-0 md:px-10 py-10">
        <Title level={2} className="mb-4 leading-tight">
          Lorem <br /> consect apng.
        </Title>
        <p className="font-semibold mt-8 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          <span className="font-extrabold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </span>
        </p>
        <p className="mt-6 text-base md:text-lg max-w-xl font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          eos ipsa commodi perspiciatis voluptates dignissimos adipisci animi
          molestias labore vitae. Beatae explicabo saepe reprehenderit tenetur
          possimus ullam suscipit delectus nemo corrupti quas cumque, nihil, eos
          quod? Ipsum alias tempora saepe?
        </p>
      </div>

      <div className="col-span-3 flex items-center justify-center w-full">
        <ReactCompareImage
          leftImage="https://assets.lumion.com/f/180614/1920x1080/bea8ca164b/forest-with-paint-placement.jpg/m/3000x0"
          rightImage="https://assets.lumion.com/f/180614/1920x1080/2ec08f530c/forest-without-paint-placement.jpg/m/2048x0"
          sliderLineWidth={1}
          sliderLineColor="white" // Tailwind emerald-500
          handleSize={50}
          hover={true}
        />
      </div>
    </Container>
  );
};

export default Comparison;
