import { delay } from "@/app/constants/mock-api";
import { RecentSales } from "@/app/features/overview/components/recent-sales";

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}
