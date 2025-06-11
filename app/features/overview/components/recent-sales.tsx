import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";

const salesData = [
  {
    name: "Lorem Ipsum",
    email: "lorem.ipsum@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/1.png",
    fallback: "LI",
    amount: "+$1,999.00",
  },
  {
    name: "Dolor Sit",
    email: "dolor.sit@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/2.png",
    fallback: "DS",
    amount: "+$39.00",
  },
  {
    name: "Amet Consectetur",
    email: "amet.consectetur@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/3.png",
    fallback: "AC",
    amount: "+$299.00",
  },
  {
    name: "Adipiscing Elit",
    email: "adipiscing.elit@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/4.png",
    fallback: "AE",
    amount: "+$99.00",
  },
  {
    name: "Sed Do",
    email: "sed.do@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/5.png",
    fallback: "SD",
    amount: "+$39.00",
  },
];

export function RecentSales() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Proposals</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {salesData.map((sale, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={sale.avatar} alt="Avatar" />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm leading-none font-medium">{sale.name}</p>
                <p className="text-muted-foreground text-sm">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
