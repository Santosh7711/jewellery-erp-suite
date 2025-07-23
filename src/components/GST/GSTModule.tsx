import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  FileText, 
  Settings, 
  Download, 
  Calculator,
  Receipt,
  Building,
  Users,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const gstRates = [
  { id: 1, category: "Gold Jewellery", rate: 3, cgst: 1.5, sgst: 1.5, igst: 3, hsnCode: "7113" },
  { id: 2, category: "Silver Jewellery", rate: 3, cgst: 1.5, sgst: 1.5, igst: 3, hsnCode: "7113" },
  { id: 3, category: "Diamond", rate: 0.25, cgst: 0.125, sgst: 0.125, igst: 0.25, hsnCode: "7102" },
  { id: 4, category: "Precious Stones", rate: 3, cgst: 1.5, sgst: 1.5, igst: 3, hsnCode: "7103" }
];

const gstr1Data = [
  { invoiceNo: "INV-001", date: "2024-05-20", customer: "Rajesh Kumar", gstin: "22AAAAA0000A1Z5", taxableValue: 45000, gstAmount: 1350, total: 46350, type: "B2B" },
  { invoiceNo: "INV-002", date: "2024-05-20", customer: "Priya Sharma", gstin: "", taxableValue: 28000, gstAmount: 840, total: 28840, type: "B2C" },
  { invoiceNo: "INV-003", date: "2024-05-19", customer: "Anil Patel", gstin: "24BBBBB1111B1Z6", taxableValue: 67000, gstAmount: 2010, total: 69010, type: "B2B" }
];

export function GSTModule() {
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [gstSplitMode, setGstSplitMode] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");

  const totalTaxableValue = gstr1Data.reduce((sum, item) => sum + item.taxableValue, 0);
  const totalGSTAmount = gstr1Data.reduce((sum, item) => sum + item.gstAmount, 0);
  const b2bInvoices = gstr1Data.filter(item => item.type === "B2B");
  const b2cInvoices = gstr1Data.filter(item => item.type === "B2C");

  const exportGSTR1 = () => {
    const csvData = gstr1Data.map(item => ({
      "Invoice No": item.invoiceNo,
      "Date": item.date,
      "Customer": item.customer,
      "GSTIN": item.gstin || "N/A",
      "Taxable Value": item.taxableValue,
      "GST Amount": item.gstAmount,
      "Total": item.total,
      "Type": item.type
    }));
    
    console.log("Exporting GSTR-1 data:", csvData);
    toast.success("GSTR-1 data exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">GST Management</h2>
          <p className="text-muted-foreground">Configure GST settings and generate compliant reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export GSTR-1
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="configuration" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="invoices">GST Invoices</TabsTrigger>
          <TabsTrigger value="reports">GST Reports</TabsTrigger>
          <TabsTrigger value="returns">GST Returns</TabsTrigger>
        </TabsList>

        {/* GST Configuration */}
        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tax Master */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Tax Master Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Business State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Gujarat">Gujarat</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>GST Split Mode</Label>
                    <p className="text-sm text-muted-foreground">Split GST into CGST + SGST</p>
                  </div>
                  <Switch checked={gstSplitMode} onCheckedChange={setGstSplitMode} />
                </div>

                <div className="space-y-2">
                  <Label>Default Place of Supply</Label>
                  <Input value="27 - Maharashtra" readOnly />
                </div>
              </CardContent>
            </Card>

            {/* HSN Code Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>HSN Code & Tax Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gstRates.map((rate) => (
                    <div key={rate.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{rate.category}</h4>
                        <Badge variant="outline">HSN: {rate.hsnCode}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total GST Rate</p>
                          <p className="font-semibold">{rate.rate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            {gstSplitMode ? "CGST + SGST" : "IGST"}
                          </p>
                          <p className="font-semibold">
                            {gstSplitMode ? `${rate.cgst}% + ${rate.sgst}%` : `${rate.igst}%`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* GST Invoices */}
        <TabsContent value="invoices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invoices</p>
                    <p className="text-2xl font-bold text-primary">{gstr1Data.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">B2B Invoices</p>
                    <p className="text-2xl font-bold text-success">{b2bInvoices.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">B2C Invoices</p>
                    <p className="text-2xl font-bold text-warning">{b2cInvoices.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>GST Invoice Register</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Invoice No</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Customer</th>
                      <th className="text-left p-3">GSTIN</th>
                      <th className="text-right p-3">Taxable Value</th>
                      <th className="text-right p-3">GST Amount</th>
                      <th className="text-right p-3">Total</th>
                      <th className="text-center p-3">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gstr1Data.map((invoice) => (
                      <tr key={invoice.invoiceNo} className="border-b hover:bg-muted/20">
                        <td className="p-3 font-medium">{invoice.invoiceNo}</td>
                        <td className="p-3">{invoice.date}</td>
                        <td className="p-3">{invoice.customer}</td>
                        <td className="p-3 font-mono text-sm">{invoice.gstin || "N/A"}</td>
                        <td className="p-3 text-right">₹{invoice.taxableValue.toLocaleString()}</td>
                        <td className="p-3 text-right">₹{invoice.gstAmount.toLocaleString()}</td>
                        <td className="p-3 text-right font-semibold">₹{invoice.total.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <Badge variant={invoice.type === "B2B" ? "default" : "secondary"}>
                            {invoice.type}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GST Reports */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>GST Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Taxable Value:</span>
                  <span className="font-bold">₹{totalTaxableValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total GST Collected:</span>
                  <span className="font-bold text-primary">₹{totalGSTAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST (1.5%):</span>
                  <span className="font-semibold">₹{(totalGSTAmount / 2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (1.5%):</span>
                  <span className="font-semibold">₹{(totalGSTAmount / 2).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={exportGSTR1} className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Export GSTR-1 (CSV)
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="w-4 h-4" />
                  Export GSTR-3B (JSON)
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Calculator className="w-4 h-4" />
                  GST Liability Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly GST Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">₹{(totalTaxableValue / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-muted-foreground">Taxable Sales</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-success">₹{(totalGSTAmount / 1000).toFixed(1)}K</p>
                  <p className="text-sm text-muted-foreground">GST Collected</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-warning">{b2bInvoices.length}</p>
                  <p className="text-sm text-muted-foreground">B2B Transactions</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-gold">{b2cInvoices.length}</p>
                  <p className="text-sm text-muted-foreground">B2C Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GST Returns */}
        <TabsContent value="returns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                GST Return Filing Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">GSTR-1 (May 2024)</h4>
                    <p className="text-sm text-muted-foreground">Sales Return - Due: 11th June 2024</p>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning">
                    Pending
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">GSTR-3B (May 2024)</h4>
                    <p className="text-sm text-muted-foreground">Summary Return - Due: 20th June 2024</p>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning">
                    Pending
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">GSTR-1 (April 2024)</h4>
                    <p className="text-sm text-muted-foreground">Sales Return - Filed on: 10th May 2024</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success">
                    Filed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}