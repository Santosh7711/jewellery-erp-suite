import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  FileText, 
  AlertTriangle, 
  IndianRupee,
  Calendar as CalendarIcon,
  Download,
  Eye,
  Package
} from "lucide-react";
import { format } from "date-fns";

const dailySalesData = [
  { date: "2024-05-15", sales: 125000, invoices: 8 },
  { date: "2024-05-16", sales: 98000, invoices: 6 },
  { date: "2024-05-17", sales: 156000, invoices: 12 },
  { date: "2024-05-18", sales: 89000, invoices: 5 },
  { date: "2024-05-19", sales: 234000, invoices: 15 },
  { date: "2024-05-20", sales: 178000, invoices: 11 }
];

const categoryWiseData = [
  { name: "Gold", value: 450000, count: 25, color: "#FFD700" },
  { name: "Silver", value: 125000, count: 18, color: "#C0C0C0" },
  { name: "Diamond", value: 320000, count: 12, color: "#B9F2FF" },
  { name: "Platinum", value: 89000, count: 4, color: "#E5E4E2" }
];

const lowStockItems = [
  { sku: "SKU002", name: "Silver Chain", category: "Silver", stock: 3, minStock: 10 },
  { sku: "SKU005", name: "Ruby Pendant", category: "Gemstone", stock: 2, minStock: 5 },
  { sku: "SKU008", name: "Gold Bracelet", category: "Gold", stock: 1, minStock: 8 },
  { sku: "SKU012", name: "Diamond Ring", category: "Diamond", stock: 4, minStock: 12 }
];

const recentInvoices = [
  { id: "INV-001", customer: "Rajesh Kumar", amount: 45000, items: 2, date: "2024-05-20", status: "Paid" },
  { id: "INV-002", customer: "Priya Sharma", amount: 28000, items: 1, date: "2024-05-20", status: "Paid" },
  { id: "INV-003", customer: "Anil Patel", amount: 67000, items: 3, date: "2024-05-19", status: "Pending" },
  { id: "INV-004", customer: "Meera Reddy", amount: 125000, items: 4, date: "2024-05-19", status: "Paid" }
];

export function ReportsModule() {
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const totalSales = dailySalesData.reduce((sum, day) => sum + day.sales, 0);
  const totalInvoices = dailySalesData.reduce((sum, day) => sum + day.invoices, 0);
  const avgOrderValue = totalSales / totalInvoices;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="w-4 h-4" />
                {dateRange ? format(dateRange, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-primary">₹{(totalSales / 100000).toFixed(1)}L</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold text-success">{totalInvoices}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.2% from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-gold">₹{avgOrderValue.toLocaleString()}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +5.1% from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-warning">{lowStockItems.length}</p>
                <p className="text-xs text-warning">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-sm"
                    tickFormatter={(value) => format(new Date(value), "MMM dd")}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-sm"
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, "Sales"]}
                    labelFormatter={(value) => format(new Date(value), "PPP")}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Wise Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryWiseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryWiseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, "Sales"]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Low Stock Alert
            </CardTitle>
            <Badge variant="outline" className="text-warning border-warning">
              {lowStockItems.length} items
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.sku} className="flex items-center justify-between p-3 rounded-lg border bg-warning/5">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p className="font-bold text-warning">{item.stock}/{item.minStock}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                    <p className="text-xs text-muted-foreground">{invoice.items} items • {invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{invoice.amount.toLocaleString()}</p>
                    <Badge 
                      variant={invoice.status === "Paid" ? "default" : "secondary"}
                      className={invoice.status === "Paid" ? "bg-success/10 text-success" : ""}
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categoryWiseData.map((category) => (
              <div key={category.name} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h4 className="font-semibold">{category.name}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sales:</span>
                    <span className="font-medium">₹{category.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items Sold:</span>
                    <span className="font-medium">{category.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Value:</span>
                    <span className="font-medium">₹{(category.value / category.count).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}