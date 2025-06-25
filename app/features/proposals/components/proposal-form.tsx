"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import ImageMasker from "./image-masker";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { SendIcon, Loader2 } from "lucide-react";

export default function ProposalForm({ pageTitle }: { pageTitle: string }) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Remove unused console logs for cleanliness

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", originalImage!); // original File from input
      formData.append("mask", maskImage!);
      formData.append("prompt", prompt);
      const response = await fetch("/api/openai", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setGeneratedImage(result.url);
      // setOriginalImage(null);
      // setMaskImage(null);
    } catch (error) {
      // Optionally handle error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-8">
          <ImageMasker
            setOriginalImage={setOriginalImage}
            setMaskImage={setMaskImage}
          />

          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-2">
              {maskImage && (
                <img
                  src={URL.createObjectURL(maskImage)}
                  alt="Masked Image"
                  className="max-w-sm h-auto"
                />
              )}
              {generatedImage && (
                <img
                  src={generatedImage}
                  alt="Generated Image"
                  className="max-w-sm h-auto"
                />
              )}
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="animate-spin w-8 h-8 text-primary mr-2" />
                <span className="text-primary font-medium">
                  Generating image...
                </span>
              </div>
            )}
          </div>
          {originalImage && (
            <div className="flex gap-2 max-w-md mx-auto">
              <Textarea
                placeholder="Enter prompt"
                value={prompt}
                className="w-full"
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                variant="outline"
                type="submit"
                className=""
                disabled={isLoading}
              >
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
