import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import Container from "./container";
import Title from "./title";

const faqs = [
  {
    question: "What is the capital of France?",
    answer: "The capital of France is Paris.",
  },
  {
    question: "How many continents are there?",
    answer: "There are seven continents in the world.",
  },
  {
    question: "What is the largest ocean on Earth?",
    answer: "The largest ocean on Earth is the Pacific Ocean.",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answer: "'Romeo and Juliet' was written by William Shakespeare.",
  },
  {
    question: "What is the boiling point of water?",
    answer: "The boiling point of water is 100°C or 212°F at sea level.",
  },
  {
    question: "What is the smallest planet in our solar system?",
    answer: "The smallest planet in our solar system is Mercury.",
  },
  {
    question: "What is the speed of light?",
    answer:
      "The speed of light is approximately 299,792 kilometers per second.",
  },
];

const Faqs = () => {
  return (
    <Container className="w-full bg-primary py-16 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <Title level={2} className="text-secondary mb-20">
          All about beyond energy
        </Title>
        <Accordion
          type="single"
          collapsible
          className="bg-primary text-secondary rounded-lg divide-y divide-secondary"
        >
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={String(idx)}>
              <AccordionTrigger className="text-xl md:text-2xl font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-base md:text-lg font-light text-secondary">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default Faqs;
