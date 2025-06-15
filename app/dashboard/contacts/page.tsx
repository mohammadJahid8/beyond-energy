import { Heading } from "@/app/components/ui/heading";
import PageContainer from "@/app/components/ui/layout/page-container";
import { Separator } from "@/app/components/ui/separator";
import { DataTableSkeleton } from "@/app/components/ui/table/data-table-skeleton";
import ContactListingPage from "@/app/features/contacts/components/contact-listing";
import { searchParamsCache } from "@/app/lib/searchparams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard: Contacts",
  description: "Manage contact form submissions",
};

interface pageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;

  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <Heading
          title="Contacts"
          description="Manage contact form submissions"
        />

        <Separator />

        <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={6} rowCount={8} filterCount={4} />
          }
        >
          <ContactListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
