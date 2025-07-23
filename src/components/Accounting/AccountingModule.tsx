import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Truck, 
  Wallet, 
  Calculator,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  FileText,
  Calendar,
  CreditCard
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const customerLedger = [
  { id: 1, customer: "Rajesh Kumar", phone: "+91 98765 43210", totalPurchases: 245000, creditLimit: 50000, currentBalance: -15000, lastTransaction: "2024-05-20", status: "Credit" },
  { id: 2, customer: "Priya Sharma", phone: "+91 87654 32109", totalPurchases: 185000, creditLimit: 30000, currentBalance: 0, lastTransaction: "2024-05-19", status: "Clear" },
  { id: 3, customer: "Anil Patel", phone: "+91 76543 21098", totalPurchases: 95000, creditLimit: 25000, currentBalance: -8500, lastTransaction: "2024-05-18", status: "Credit" },
];

const vendorPayments = [
  { id: 1, vendor: "Gold Supplier Ltd", category: "Raw Material", totalPurchases: 1250000, pendingAmount: 85000, lastPayment: "2024-05-15", nextDue: "2024-05-30" },
  { id: 2, vendor: "Diamond Imports", category: "Stones", totalPurchases: 850000, pendingAmount: 45000, lastPayment: "2024-05-18", nextDue: "2024-06-02" },
  { id: 3, vendor: "Silver Crafts", category: "Silver Items", totalPurchases: 320000, pendingAmount: 0, lastPayment: "2024-05-20", nextDue: "2024-06-15" },
];

const cashbookEntries = [
  { id: 1, date: "2024-05-20", description: "Cash Sales - Invoice #INV-001", type: "Credit", amount: 45000, balance: 245000 },
  { id: 2, date: "2024-05-20", description: "Vendor Payment - Gold Supplier", type: "Debit", amount: 25000, balance: 200000 },
  { id: 3, date: "2024-05-19", description: "Cash Sales - Invoice #INV-002", type: "Credit", amount: 28000, balance: 225000 },
  { id: 4, date: "2024-05-19", description: "Office Rent", type: "Debit", amount: 15000, balance: 197000 },
];

export function AccountingModule() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [cashBalance, setCashBalance] = useState(245000);

  const totalCredit = customerLedger.reduce((sum, customer) => sum + Math.abs(customer.currentBalance), 0);
  const totalVendorPending = vendorPayments.reduce((sum, vendor) => sum + vendor.pendingAmount, 0);
  const todaysCashIn = cashbookEntries.filter(entry => entry.type === "Credit" && entry.date === "2024-05-20").reduce((sum, entry) => sum + entry.amount, 0);
  const todaysCashOut = cashbookEntries.filter(entry => entry.type === "Debit" && entry.date === "2024-05-20").reduce((sum, entry) => sum + entry.amount, 0);

  const addCashEntry = () => {
    toast.success("Cash entry added successfully!");
  };

  const closeDayBook = () => {
    toast.success("Day book closed successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Accounting Module</h2>
          <p className="text-muted-foreground">Manage customer ledgers, vendor payments, and cashbook</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Export Ledger
          </Button>
          <Button onClick={closeDayBook} className="gap-2">
            <Calculator className="w-4 h-4" />
            Close Day Book
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cash Balance</p>
                <p className="text-2xl font-bold text-success">₹{cashBalance.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer Credit</p>
                <p className="text-2xl font-bold text-warning">₹{totalCredit.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vendor Pending</p>
                <p className="text-2xl font-bold text-destructive">₹{totalVendorPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Net</p>
                <p className="text-2xl font-bold text-primary">₹{(todaysCashIn - todaysCashOut).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customer-ledger" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customer-ledger">Customer Ledger</TabsTrigger>
          <TabsTrigger value="vendor-payments">Vendor Payments</TabsTrigger>
          <TabsTrigger value="cashbook">Cashbook</TabsTrigger>
        </TabsList>

        {/* Customer Ledger */}
        <TabsContent value="customer-ledger" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customer Credit Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Customer</th>
                      <th className="text-left p-3">Contact</th>
                      <th className="text-right p-3">Total Purchases</th>
                      <th className="text-right p-3">Credit Limit</th>
                      <th className="text-right p-3">Current Balance</th>
                      <th className="text-left p-3">Last Transaction</th>
                      <th className="text-center p-3">Status</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerLedger.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-muted/20">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{customer.customer}</p>
                            <p className="text-sm text-muted-foreground">ID: CUST-{customer.id.toString().padStart(3, '0')}</p>
                          </div>
                        </td>
                        <td className="p-3 text-sm">{customer.phone}</td>
                        <td className="p-3 text-right">₹{customer.totalPurchases.toLocaleString()}</td>
                        <td className="p-3 text-right">₹{customer.creditLimit.toLocaleString()}</td>
                        <td className="p-3 text-right">
                          <span className={customer.currentBalance < 0 ? "text-destructive font-semibold" : "text-success"}>
                            ₹{Math.abs(customer.currentBalance).toLocaleString()}
                            {customer.currentBalance < 0 ? " (CR)" : ""}
                          </span>
                        </td>
                        <td className="p-3">{customer.lastTransaction}</td>
                        <td className="p-3 text-center">
                          <Badge variant={customer.status === "Credit" ? "destructive" : "default"}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Payment</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendor Payments */}
        <TabsContent value="vendor-payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Vendor Payment Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Vendor</th>
                      <th className="text-left p-3">Category</th>
                      <th className="text-right p-3">Total Purchases</th>
                      <th className="text-right p-3">Pending Amount</th>
                      <th className="text-left p-3">Last Payment</th>
                      <th className="text-left p-3">Next Due</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorPayments.map((vendor) => (
                      <tr key={vendor.id} className="border-b hover:bg-muted/20">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{vendor.vendor}</p>
                            <p className="text-sm text-muted-foreground">VEN-{vendor.id.toString().padStart(3, '0')}</p>
                          </div>
                        </td>
                        <td className="p-3">{vendor.category}</td>
                        <td className="p-3 text-right">₹{vendor.totalPurchases.toLocaleString()}</td>
                        <td className="p-3 text-right">
                          <span className={vendor.pendingAmount > 0 ? "text-destructive font-semibold" : "text-success"}>
                            ₹{vendor.pendingAmount.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-3">{vendor.lastPayment}</td>
                        <td className="p-3">{vendor.nextDue}</td>
                        <td className="p-3 text-center">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">Pay</Button>
                            <Button variant="ghost" size="sm">History</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cashbook */}
        <TabsContent value="cashbook" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add Cash Entry */}
            <Card>
              <CardHeader>
                <CardTitle>Add Cash Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Entry Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Cash In (Credit)</SelectItem>
                      <SelectItem value="debit">Cash Out (Debit)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Enter description" />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <Button onClick={addCashEntry} className="w-full">
                  Add Entry
                </Button>
              </CardContent>
            </Card>

            {/* Daily Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Opening Balance:</span>
                  <span className="font-semibold">₹2,00,000</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Cash In:</span>
                  <span className="font-semibold">+₹{todaysCashIn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Cash Out:</span>
                  <span className="font-semibold">-₹{todaysCashOut.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Closing Balance:</span>
                  <span>₹{cashBalance.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cashbook Entries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Cashbook Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Description</th>
                      <th className="text-center p-3">Type</th>
                      <th className="text-right p-3">Amount</th>
                      <th className="text-right p-3">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashbookEntries.map((entry) => (
                      <tr key={entry.id} className="border-b hover:bg-muted/20">
                        <td className="p-3">{entry.date}</td>
                        <td className="p-3">{entry.description}</td>
                        <td className="p-3 text-center">
                          <Badge variant={entry.type === "Credit" ? "default" : "destructive"}>
                            {entry.type === "Credit" ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {entry.type}
                          </Badge>
                        </td>
                        <td className={`p-3 text-right font-semibold ${entry.type === "Credit" ? "text-success" : "text-destructive"}`}>
                          {entry.type === "Credit" ? "+" : "-"}₹{entry.amount.toLocaleString()}
                        </td>
                        <td className="p-3 text-right font-semibold">₹{entry.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}