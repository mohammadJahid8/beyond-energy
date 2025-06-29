"use client";
import type React from "react";
import Container from "./container";
import Title from "./title";
import { Phone, Mail, MapPin } from "lucide-react";
import { CardContent } from "../ui/card";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData);

      const response = await axios.post("/api/contact", data);

      if (response.status !== 200) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Failed to send message. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="grid grid-cols-1 md:grid-cols-5 text-primary dark:text-primary-foreground w-full overflow-hidden my-24">
      <div className="col-span-3 flex flex-col justify-center px-0 md:px-10 py-10">
        <Title level={2} className="mb-4 leading-tight">
          Lorem <br /> consect apng?
        </Title>
        <p className="font-semibold mt-8 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          <span className="font-extrabold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </span>
        </p>
        {/* mobile, email, phone, address here */}
        <div className="mt-6 text-base md:text-lg max-w-xl font-light flex flex-col gap-2">
          <div className="flex items-center font-extrabold">
            <Phone className="mr-2" /> +123 456 7890
          </div>
          <div className="flex items-center font-extrabold">
            <Mail className="mr-2" /> info@beyondenergy.com
          </div>
          <div className="flex items-center font-extrabold">
            <MapPin className="mr-2" /> 123 Main St, Anytown,
          </div>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center w-full">
        <Card className="w-full rounded-md shadow-none">
          <CardContent className="">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-primary">
                  Get In Touch
                </h3>
                <p className="text-muted-foreground mt-2">
                  Send us a message and we&apos;ll get back to you soon.
                </p>
              </div>

              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/15 text-green-500 text-sm p-3 rounded-md">
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    className="w-full"
                    name="firstName"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    className="w-full"
                    name="lastName"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  className="w-full"
                  name="email"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  required
                  className="w-full"
                  name="subject"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  required
                  className="w-full min-h-[120px] resize-none"
                  name="message"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold py-3 h-10 dark:bg-primary-foreground dark:text-primary cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We&apos;ll respond to your message within 24 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Contact;
