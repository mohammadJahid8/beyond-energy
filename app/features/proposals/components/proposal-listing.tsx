import { Proposal } from "@/app/constants/data";
import { fakeProposals } from "@/app/constants/mock-api";
import { searchParamsCache } from "@/app/lib/searchparams";
import { ProposalTable } from "./proposal-tables";
import { columns } from "./proposal-tables/columns";

export default async function ProposalListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("name");
  const pageLimit = searchParamsCache.get("perPage");
  const categories = searchParamsCache.get("category");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  };

  const data = await fakeProposals.getProposals(filters);
  console.log("🚀 ~ ProposalListingPage ~ data:", data);
  const totalProposals = data.total_proposals;
  const proposals: Proposal[] = data.proposals;

  return (
    <ProposalTable
      data={proposals}
      totalItems={totalProposals}
      columns={columns}
    />
  );
}
