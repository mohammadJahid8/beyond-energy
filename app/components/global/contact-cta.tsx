import React from "react";
import Container from "./container";
import { Button } from "@/app/components/ui/button";
import Title from "./title";

const ContactCta = () => {
  return (
    <section className="w-full bg-primary py-20 flex items-center justify-center min-h-[400px]">
      <Container className="w-full">
        <div className="text-center w-full max-w-4xl mx-auto px-2">
          <Title
            level={1}
            className="text-secondary font-semibold mb-6 md:mb-8"
          >
            Contact us now
          </Title>
          <p className="text-base md:text-xl text-secondary mb-8 md:mb-12 max-w-3xl mx-auto font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum amet
            vel saepe vitae accusantium. Eveniet ratione unde soluta velit
            deleniti.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
            <Button
              variant="secondary"
              size="lg"
              className="rounded h-12 text-base w-auto text-primary"
            >
              Click here
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-secondary text-secondary rounded h-12 text-base w-auto"
            >
              See plans
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactCta;
