import { buttonVariants } from "@/app/components/ui/button";
import { Heading } from "@/app/components/ui/heading";
import PageContainer from "@/app/components/ui/layout/page-container";
import { Separator } from "@/app/components/ui/separator";
import { DataTableSkeleton } from "@/app/components/ui/table/data-table-skeleton";
import ProposalListingPage from "@/app/features/proposals/components/proposal-listing";
import { searchParamsCache } from "@/app/lib/searchparams";
import { cn } from "@/app/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard: Proposals",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Proposals" description="Manage proposals" />
          <Link
            href="/dashboard/proposals/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <ProposalListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
