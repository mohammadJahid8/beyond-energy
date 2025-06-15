import connectMongoDB from "@/app/lib/db-connect";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } =
      await request.json();
    await connectMongoDB();
    await Contact.create({ firstName, lastName, email, subject, message });
    return NextResponse.json({ message: "Contact Created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { data: contacts, totalCount: contacts.length },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get contacts" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await connectMongoDB();
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ message: "Contact deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
