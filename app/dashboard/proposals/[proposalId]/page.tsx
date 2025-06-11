import { Suspense } from "react";
import ProductViewPage from "@/app/features/products/components/product-view-page";
import PageContainer from "@/app/components/ui/layout/page-container";
import FormCardSkeleton from "@/app/components/global/form-card-skeleton";

export const metadata = {
  title: "Dashboard : Proposal View",
};

type PageProps = { params: Promise<{ proposalId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  console.log("🚀 ~ Page ~ params:", params);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage proposalId={params.proposalId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
