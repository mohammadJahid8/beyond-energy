import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    console.log("🚀 ~ POST ~ body:", firstName, lastName, email, password);

    const payload = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: [email],
      password: password,
      skipPasswordChecks: true,
      publicMetadata: {
        role: "admin",
      },
    };
    // console.log("🚀 ~ createUser ~ payload:", payload);
    const clerk = await clerkClient();
    const user = await clerk.users.createUser(payload);
    return Response.json({
      success: true,
      message: "User created",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}
