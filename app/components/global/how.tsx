import React from "react";
import Container from "./container";
import Title from "./title";

const How = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 bg-primary text-secondary w-full overflow-hidden">
      <Container className="col-span-2 flex flex-col justify-center py-10">
        <Title level={2} className="text-secondary mb-4 leading-tight">
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
      </Container>
      <div className="col-span-3 flex items-center justify-center w-full">
        <video
          src="https://assets.lumion.com/f/180614/x/1e9bc043d3/new-fine-detail-nature-showcase-2024.mp4"
          controls={false}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
};

export default How;
