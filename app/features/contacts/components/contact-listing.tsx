import { searchParamsCache } from "@/app/lib/searchparams";
import { ContactTable } from "./contact-tables";
import { columns } from "./contact-tables/columns";
import { getContacts } from "@/app/actions";

export type Contact = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
};

export default async function ContactListingPage() {
  const { data: contacts } = await getContacts();

  // Get search params
  const page = searchParamsCache.get("page");
  const perPage = searchParamsCache.get("perPage");
  const search = (searchParamsCache.get("name") ?? "").toLowerCase();

  // Filter contacts based on search param
  const filteredContacts = contacts.filter(
    (contact: Contact) =>
      !search ||
      contact.firstName.toLowerCase().includes(search) ||
      contact.lastName.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      contact.subject.toLowerCase().includes(search)
  );

  // Pagination logic
  const offset = (page - 1) * perPage;
  const paginatedContacts = filteredContacts.slice(offset, offset + perPage);

  return (
    <ContactTable
      data={paginatedContacts}
      totalItems={filteredContacts.length}
      columns={columns}
    />
  );
}
