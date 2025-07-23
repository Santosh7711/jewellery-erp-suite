import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye, 
  Filter,
  Download,
  CreditCard,
  Clock,
  CheckCircle,
  ArrowUpDown,
  IndianRupee,
  Calendar,
  User
} from "lucide-react";

const sampleGirviAccounts = [
  {
    id: "G001",
    customerName: "Adinath Ji",
    customerPhone: "+91 98765 43210",
    totalAmount: "₹2,50,000",
    interestRate: "12%",
    startDate: "15 May 2024",
    maturityDate: "15 May 2025",
    lastPayment: "₹15,000",
    lastPaymentDate: "19 May 2024",
    status: "Active",
    itemsCount: 3,
    avatar: "AJ",
    transactions: [
      { type: "GIRVI JAMA", amount: "₹2,50,000", date: "15 May 2024", status: "Success" },
      { type: "INTEREST PAYMENT", amount: "₹5,000", date: "19 May 2024", status: "Success" },
      { type: "PARTIAL PAYMENT", amount: "₹15,000", date: "19 May 2024", status: "Success" }
    ]
  },
  {
    id: "G002",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 87654 32109",
    totalAmount: "₹1,85,000",
    interestRate: "12%",
    startDate: "10 April 2024",
    maturityDate: "10 April 2025",
    lastPayment: "₹8,000",
    lastPaymentDate: "15 May 2024",
    status: "Active",
    itemsCount: 2,
    avatar: "RK",
    transactions: [
      { type: "GIRVI JAMA", amount: "₹1,85,000", date: "10 April 2024", status: "Success" },
      { type: "INTEREST PAYMENT", amount: "₹8,000", date: "15 May 2024", status: "Success" }
    ]
  },
  {
    id: "G003",
    customerName: "Priya Sharma",
    customerPhone: "+91 76543 21098",
    totalAmount: "₹95,000",
    interestRate: "12%",
    startDate: "22 March 2024",
    maturityDate: "22 March 2025",
    lastPayment: "₹95,000",
    lastPaymentDate: "18 May 2024",
    status: "Closed",
    itemsCount: 1,
    avatar: "PS",
    transactions: [
      { type: "GIRVI JAMA", amount: "₹95,000", date: "22 March 2024", status: "Success" },
      { type: "FULL REDEMPTION", amount: "₹95,000", date: "18 May 2024", status: "Success" }
    ]
  },
  {
    id: "G004",
    customerName: "Meera Reddy",
    customerPhone: "+91 65432 10987",
    totalAmount: "₹3,25,000",
    interestRate: "12%",
    startDate: "05 May 2024",
    maturityDate: "05 May 2025",
    lastPayment: "₹12,000",
    lastPaymentDate: "20 May 2024",
    status: "Active",
    itemsCount: 4,
    avatar: "MR",
    transactions: [
      { type: "GIRVI JAMA", amount: "₹3,25,000", date: "05 May 2024", status: "Success" },
      { type: "INTEREST PAYMENT", amount: "₹12,000", date: "20 May 2024", status: "Success" }
    ]
  },
  {
    id: "G005",
    customerName: "Vikram Singh",
    customerPhone: "+91 54321 09876",
    totalAmount: "₹1,55,000",
    interestRate: "12%",
    startDate: "28 February 2024",
    maturityDate: "28 February 2025",
    lastPayment: "₹6,500",
    lastPaymentDate: "16 May 2024",
    status: "Overdue",
    itemsCount: 2,
    avatar: "VS",
    transactions: [
      { type: "GIRVI JAMA", amount: "₹1,55,000", date: "28 February 2024", status: "Success" },
      { type: "INTEREST PAYMENT", amount: "₹6,500", date: "16 May 2024", status: "Success" }
    ]
  }
];

export function GirviManagementFull() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const statuses = ["All", "Active", "Closed", "Overdue"];

  const filteredAccounts = sampleGirviAccounts.filter(account => {
    const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.customerPhone.includes(searchTerm);
    const matchesStatus = selectedStatus === "All" || account.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success border-success/20";
      case "Closed": return "bg-muted text-muted-foreground border-border";
      case "Overdue": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <CheckCircle className="w-3 h-3" />;
      case "Closed": return <CheckCircle className="w-3 h-3" />;
      case "Overdue": return <Clock className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const totalActiveAmount = sampleGirviAccounts
    .filter(account => account.status === "Active")
    .reduce((sum, account) => sum + parseInt(account.totalAmount.replace(/[₹,]/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Girvi Management</h2>
          <p className="text-muted-foreground">Manage pledge accounts and transactions</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Plus className="w-4 h-4" />
          New Girvi Account
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Accounts</p>
                <p className="text-2xl font-bold text-primary">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Accounts</p>
                <p className="text-2xl font-bold text-success">143</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-gold">₹{(totalActiveAmount / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due This Month</p>
                <p className="text-2xl font-bold text-warning">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name, phone, or account ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="transition-all duration-200"
                >
                  {status}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Girvi Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAccounts.map((account, index) => (
                  <div
                    key={account.id}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer animate-slide-up ${
                      selectedAccount?.id === account.id 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'bg-card hover:bg-muted/20'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedAccount(account)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                            {account.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{account.customerName}</h3>
                          <p className="text-sm text-muted-foreground">ID: {account.id}</p>
                          <p className="text-xs text-muted-foreground">{account.customerPhone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">{account.totalAmount}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(account.status)}>
                            {getStatusIcon(account.status)}
                            {account.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{account.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Items</p>
                        <p className="font-medium">{account.itemsCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Start Date</p>
                        <p className="font-medium">{account.startDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Payment</p>
                        <p className="font-medium text-success">{account.lastPayment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Details */}
        <div className="space-y-6">
          {selectedAccount ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Account Details</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-lg">
                        {selectedAccount.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedAccount.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedAccount.customerPhone}</p>
                      <Badge className={getStatusColor(selectedAccount.status)}>
                        {selectedAccount.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account ID:</span>
                      <span className="font-medium">{selectedAccount.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-bold text-primary">{selectedAccount.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate:</span>
                      <span className="font-medium">{selectedAccount.interestRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items Count:</span>
                      <span className="font-medium">{selectedAccount.itemsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span className="font-medium">{selectedAccount.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maturity Date:</span>
                      <span className="font-medium">{selectedAccount.maturityDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" className="gap-2">
                      <IndianRupee className="w-4 h-4" />
                      Add Payment
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedAccount.transactions.map((transaction: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.type}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-success">{transaction.amount}</p>
                        <p className="text-xs text-success">✓</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Select an Account</h3>
                <p className="text-muted-foreground">
                  Click on any account from the list to view details and transactions
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}