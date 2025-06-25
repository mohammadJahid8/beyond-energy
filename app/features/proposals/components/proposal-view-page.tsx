import { fakeProposals } from "@/app/constants/mock-api";
import { Proposal } from "@/app/constants/data";
import { notFound } from "next/navigation";
import ProposalForm from "./proposal-form";

type TProposalViewPageProps = {
  proposalId: string;
};

export default async function ProposalViewPage({
  proposalId,
}: TProposalViewPageProps) {
  let proposal = null;
  let pageTitle = "Create New Proposal";
  console.log({ proposalId });

  if (proposalId !== "new") {
    const data = await fakeProposals.getProposalById(Number(proposalId));
    proposal = data.proposal as Proposal;
    if (!proposal) {
      notFound();
    }
    pageTitle = `Edit Proposal`;
  }

  return <ProposalForm initialData={proposal} pageTitle={pageTitle} />;
}
