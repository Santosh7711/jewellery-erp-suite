import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Clock, CheckCircle } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "GIRVI BE-CASH PAYMENT",
    customer: "Customer Number - 01",
    time: "2 hrs ago",
    amount: "₹15,000",
    status: "Success"
  },
  {
    id: 2,
    type: "GIRVI JAMA",
    customer: "Customer Number - 01",
    time: "5 hrs ago",
    amount: "₹1,15,000",
    status: "Success"
  },
  {
    id: 3,
    type: "GIRVI TRANSFER",
    customer: "Customer Number - 04",
    time: "1 day ago",
    amount: "₹25,000",
    status: "Success"
  },
  {
    id: 4,
    type: "GOLD PURCHASE",
    customer: "Customer Number - 07",
    time: "2 days ago",
    amount: "₹45,000",
    status: "Success"
  }
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.type}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{transaction.customer}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {transaction.time}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-success">{transaction.amount}</p>
              <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                {transaction.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}