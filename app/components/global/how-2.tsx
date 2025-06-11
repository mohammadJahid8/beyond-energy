import React from "react";
import Container from "./container";
import Title from "./title";

const How2 = () => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-5 text-primary dark:text-primary-foreground w-full overflow-hidden my-24">
      <div className="col-span-3 flex items-center justify-center w-full order-2 md:order-1">
        <video
          src="https://assets.lumion.com/f/180614/x/9e24075cf1/lumion-landscape-rendering-showcase.mp4"
          controls={false}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      <div className="col-span-2 flex flex-col justify-center px-0 md:px-10 py-10 order-1 md:order-2">
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
    </Container>
  );
};

export default How2;
