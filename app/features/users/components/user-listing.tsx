import { searchParamsCache } from "@/app/lib/searchparams";
import { UserTable } from "./user-tables";
import { columns } from "./user-tables/columns";
import { clerkClient } from "@clerk/nextjs/server";

export type ClerkUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  createdAt: number;
};

export default async function UserListingPage() {
  const mainUsers = await (await clerkClient()).users.getUserList();
  console.log("🚀 ~ UserListingPage ~ mainUsers:", mainUsers);

  // Map Clerk users to the table's expected structure
  const users: ClerkUser[] = mainUsers.data.map((user) => ({
    id: user.id,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.emailAddresses?.[0]?.emailAddress ?? "",
    imageUrl: user.imageUrl ?? "",
    createdAt: user.createdAt,
  }));

  // Get search params
  const page = searchParamsCache.get("page");
  const perPage = searchParamsCache.get("perPage");
  const search = (searchParamsCache.get("name") ?? "").toLowerCase();

  // Filter users based on search param
  const filteredUsers = users.filter(
    (user) =>
      !search ||
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
  );

  // Pagination logic
  const offset = (page - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + perPage);

  return (
    <UserTable
      data={paginatedUsers}
      totalItems={filteredUsers.length}
      columns={columns}
    />
  );
}
