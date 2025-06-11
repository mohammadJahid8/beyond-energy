import { fakeProducts, Product } from "@/app/constants/mock-api";
import { notFound } from "next/navigation";
import ProductForm from "./product-form";

type TProductViewPageProps = {
  proposalId: string;
};

export default async function ProductViewPage({
  proposalId,
}: TProductViewPageProps) {
  let proposal = null;
  let pageTitle = "Create New Proposal";
  console.log({ proposalId });

  if (proposalId !== "new") {
    const data = await fakeProducts.getProductById(Number(proposalId));
    proposal = data.product as Product;
    if (!proposal) {
      notFound();
    }
    pageTitle = `Edit Proposal`;
  }

  return <ProductForm initialData={proposal} pageTitle={pageTitle} />;
}
