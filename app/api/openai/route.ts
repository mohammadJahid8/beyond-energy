import OpenAI, { toFile } from "openai";
import { NextRequest } from "next/server";
import { Readable } from "stream";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const imageFile = formData.get("image") as Blob;
  const maskFile = formData.get("mask") as Blob;
  const prompt = formData.get("prompt") as string;

  if (!imageFile || !maskFile) {
    return Response.json({
      success: false,
      message: "Image and mask files are required",
    });
  }

  try {
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const maskBuffer = Buffer.from(await maskFile.arrayBuffer());

    const imageStream = Readable.from(imageBuffer);
    const maskStream = Readable.from(maskBuffer);

    const rsp = await openai.images.edit({
      model: "gpt-image-1",
      image: await toFile(imageStream, "image.png", {
        type: imageFile.type || "image/png",
      }),
      mask: await toFile(maskStream, "mask.png", {
        type: maskFile.type || "image/png",
      }),
      prompt: `Without changing the original image, edit it according to the following prompt: ${prompt}`,
    });

    const image_base64 = rsp.data[0].b64_json;
    const dataUrl = `data:image/png;base64,${image_base64}`;

    return Response.json({
      success: true,
      response: rsp,
      url: dataUrl,
    });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    return Response.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}
