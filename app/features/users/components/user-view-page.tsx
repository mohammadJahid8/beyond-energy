import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import UserForm from "./user-form";

type TUserViewPageProps = {
  userId: string;
};

export default async function UserViewPage({ userId }: TUserViewPageProps) {
  let user: any = null;
  let pageTitle = "Create New Admin";

  if (userId !== "new") {
    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);
    if (!clerkUser) {
      notFound();
    }
    user = {
      firstName: clerkUser.firstName ?? "",
      lastName: clerkUser.lastName ?? "",
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
    };
    pageTitle = `Edit User`;
  }

  return <UserForm initialData={user} pageTitle={pageTitle} />;
}
