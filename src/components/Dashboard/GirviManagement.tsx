import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Edit, 
  Info, 
  ArrowUpDown, 
  CheckCircle,
  User
} from "lucide-react";

const girviAccount = {
  name: "Adinath Ji",
  status: "PRESENT(2)",
  transactions: [
    {
      type: "GIRVI BE-CASH PAYMENT",
      date: "19 May 2023",
      amount: "₹15,000",
      status: "success"
    },
    {
      type: "GIRVI JAMA",
      date: "18 May 2023", 
      amount: "₹1,15,000",
      status: "success"
    },
    {
      type: "GIRVI TRANSFER",
      date: "17 May 2023",
      amount: "₹25,000",
      status: "success"
    }
  ]
};

export function GirviManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Girvi Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Account Header */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                AJ
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{girviAccount.name}</h3>
              <Badge variant="secondary" className="bg-success/10 text-success">
                {girviAccount.status}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <Edit className="w-4 h-4" />
            EDIT
          </Button>
        </div>

        {/* Transaction Tabs */}
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Info className="w-4 h-4" />
            Info
          </Button>
          <Button variant="default" size="sm">
            Transaction
          </Button>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">All Transactions (6)</span>
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowUpDown className="w-3 h-3" />
            </Button>
          </div>

          {girviAccount.transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.type}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-success">{transaction.amount}</p>
                <div className="w-3 h-3 text-success">✓</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="gap-2">
            <User className="w-4 h-4" />
            Add Payment
          </Button>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Transfer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}