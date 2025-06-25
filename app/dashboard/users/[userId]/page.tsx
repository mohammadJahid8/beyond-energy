import { Suspense } from "react";
import PageContainer from "@/app/components/ui/layout/page-container";
import FormCardSkeleton from "@/app/components/global/form-card-skeleton";
import UserViewPage from "@/app/features/users/components/user-view-page";
import { checkRole } from "@/app/lib/check-role";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard : User View",
};

type PageProps = { params: Promise<{ userId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isSuperAdmin = await checkRole("superAdmin");
  if (!isSuperAdmin) {
    redirect("/");
  }
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <UserViewPage userId={params.userId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
