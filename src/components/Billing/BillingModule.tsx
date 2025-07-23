import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Trash, 
  Calculator, 
  FileText, 
  Printer,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface BillItem {
  id: string;
  productName: string;
  sku: string;
  category: string;
  purity: string;
  grossWeight: number;
  netWeight: number;
  wastage: number;
  goldRate: number;
  makingCharges: number;
  stoneCharges: number;
  quantity: number;
  itemTotal: number;
}

const sampleProducts = [
  { sku: "SKU001", name: "Gold Diamond Ring", category: "Gold", purity: "22K", grossWeight: 5.2, netWeight: 4.8, wastage: 8, makingCharges: 800, stoneCharges: 2500 },
  { sku: "SKU002", name: "Silver Chain", category: "Silver", purity: "925", grossWeight: 15.8, netWeight: 15.0, wastage: 5, makingCharges: 50, stoneCharges: 0 },
  { sku: "SKU003", name: "Diamond Earrings", category: "Diamond", purity: "18K", grossWeight: 3.5, netWeight: 3.2, wastage: 10, makingCharges: 1200, stoneCharges: 15000 }
];

export function BillingModule() {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    gstin: ""
  });
  const [discount, setDiscount] = useState({ type: "flat", value: 0 });
  const [paymentMode, setPaymentMode] = useState("");

  const goldRate22K = 6280; // Current 22K gold rate
  const goldRate18K = 5140; // Current 18K gold rate
  const silverRate = 82; // Current silver rate
  const gstRate = 3; // GST rate 3%

  // Enhanced invoice generation with GST compliance
  const generateGSTCompliantInvoice = () => {
    if (billItems.length === 0) {
      toast.error("Please add items to the bill!");
      return;
    }
    if (!customerInfo.name || !customerInfo.mobile) {
      toast.error("Please enter customer name and mobile number!");
      return;
    }
    if (!paymentMode) {
      toast.error("Please select payment mode!");
      return;
    }

    const invoiceType = customerInfo.gstin ? "B2B" : "B2C";
    const sequentialNumber = `KJ${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;
    
    const invoiceData = {
      invoiceNumber: sequentialNumber,
      invoiceType,
      date: new Date().toISOString(),
      customer: customerInfo,
      items: billItems.map(item => ({
        ...item,
        hsnCode: item.category === "Gold" ? "7113" : item.category === "Silver" ? "7113" : "7102",
        gstRate: 3,
        cgst: 1.5,
        sgst: 1.5
      })),
      subtotal,
      discount: discountAmount,
      taxableAmount: totalBeforeGST,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      totalGst: gstAmount,
      total: finalTotal,
      paymentMode,
      placeOfSupply: "27-Maharashtra",
      businessGstin: "27KALYAN123456789"
    };

    console.log("Generating GST compliant invoice:", invoiceData);
    toast.success(`GST Invoice ${sequentialNumber} generated successfully!`);
  };

  const addProductToBill = () => {
    if (!selectedProduct) {
      toast.error("Please select a product!");
      return;
    }

    const product = sampleProducts.find(p => p.sku === selectedProduct);
    if (!product) return;

    const goldRateToUse = product.purity === "22K" ? goldRate22K : 
                         product.purity === "18K" ? goldRate18K : 
                         product.category === "Silver" ? silverRate : goldRate22K;

    const goldValue = product.netWeight * goldRateToUse;
    const wastageAmount = (goldValue * product.wastage) / 100;
    const itemTotal = goldValue + wastageAmount + product.makingCharges + product.stoneCharges;

    const newItem: BillItem = {
      id: Date.now().toString(),
      productName: product.name,
      sku: product.sku,
      category: product.category,
      purity: product.purity,
      grossWeight: product.grossWeight,
      netWeight: product.netWeight,
      wastage: product.wastage,
      goldRate: goldRateToUse,
      makingCharges: product.makingCharges,
      stoneCharges: product.stoneCharges,
      quantity: 1,
      itemTotal: itemTotal
    };

    setBillItems([...billItems, newItem]);
    setSelectedProduct("");
    toast.success("Product added to bill!");
  };

  const removeItem = (id: string) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setBillItems(billItems.map(item => 
      item.id === id 
        ? { ...item, quantity, itemTotal: (item.itemTotal / item.quantity) * quantity }
        : item
    ));
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const discountAmount = discount.type === "flat" ? discount.value : (subtotal * discount.value) / 100;
  const totalBeforeGST = subtotal - discountAmount;
  const gstAmount = (totalBeforeGST * gstRate) / 100;
  const finalTotal = totalBeforeGST + gstAmount;

  const generateInvoice = () => {
    generateGSTCompliantInvoice();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Billing Module</h2>
          <p className="text-muted-foreground">Create invoices with automatic calculations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            New Bill
          </Button>
          <Button className="gap-2">
            <Receipt className="w-4 h-4" />
            Generate Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product Selection & Bill Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerMobile">Mobile Number *</Label>
                  <Input
                    id="customerMobile"
                    value={customerInfo.mobile}
                    onChange={(e) => setCustomerInfo({...customerInfo, mobile: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email (Optional)</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="customer@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerGSTIN">GSTIN (B2B)</Label>
                  <Input
                    id="customerGSTIN"
                    value={customerInfo.gstin}
                    onChange={(e) => setCustomerInfo({...customerInfo, gstin: e.target.value})}
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Add Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleProducts.map((product) => (
                        <SelectItem key={product.sku} value={product.sku}>
                          {product.name} ({product.sku}) - {product.purity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addProductToBill} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add to Bill
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bill Items */}
          <Card>
            <CardHeader>
              <CardTitle>Bill Items</CardTitle>
            </CardHeader>
            <CardContent>
              {billItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No items added to bill yet
                </div>
              ) : (
                <div className="space-y-4">
                  {billItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                          <Badge variant="outline">{item.purity}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Gross Weight</p>
                          <p className="font-medium">{item.grossWeight}g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Net Weight</p>
                          <p className="font-medium">{item.netWeight}g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rate</p>
                          <p className="font-medium">₹{item.goldRate}/g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-20 h-8"
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Gold Value</p>
                          <p className="font-medium">₹{(item.netWeight * item.goldRate).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Wastage ({item.wastage}%)</p>
                          <p className="font-medium">₹{((item.netWeight * item.goldRate * item.wastage) / 100).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Making Charges</p>
                          <p className="font-medium">₹{item.makingCharges.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Stone Charges</p>
                          <p className="font-medium">₹{item.stoneCharges.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2 border-t">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Item Total</p>
                          <p className="text-lg font-bold text-primary">₹{item.itemTotal.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Bill Summary */}
        <div className="space-y-6">
          {/* Bill Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                {/* Discount */}
                <div className="space-y-2">
                  <Label>Discount</Label>
                  <div className="flex gap-2">
                    <Select value={discount.type} onValueChange={(value) => setDiscount({...discount, type: value})}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat">₹</SelectItem>
                        <SelectItem value="percent">%</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={discount.value}
                      onChange={(e) => setDiscount({...discount, value: parseFloat(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount Amount:</span>
                    <span className="text-destructive">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span>Total before GST:</span>
                  <span className="font-semibold">₹{totalBeforeGST.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>GST @ {gstRate}%:</span>
                  <div className="text-right">
                    <div>₹{gstAmount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      CGST: ₹{(gstAmount/2).toLocaleString()} | SGST: ₹{(gstAmount/2).toLocaleString()}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Final Total:</span>
                  <span className="text-primary">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Mode */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={paymentMode === "cash" ? "default" : "outline"}
                  onClick={() => setPaymentMode("cash")}
                  className="gap-2"
                >
                  <Banknote className="w-4 h-4" />
                  Cash
                </Button>
                <Button
                  variant={paymentMode === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMode("card")}
                  className="gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Card
                </Button>
                <Button
                  variant={paymentMode === "upi" ? "default" : "outline"}
                  onClick={() => setPaymentMode("upi")}
                  className="gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  UPI
                </Button>
                <Button
                  variant={paymentMode === "credit" ? "default" : "outline"}
                  onClick={() => setPaymentMode("credit")}
                  className="gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  Credit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <Button onClick={generateInvoice} className="w-full gap-2">
                <FileText className="w-4 h-4" />
                Generate GST Invoice
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Printer className="w-4 h-4" />
                Print GST Invoice
              </Button>
              <Button variant="outline" className="w-full gap-2">
                Return/Refund
              </Button>
              <Button variant="outline" className="w-full gap-2">
                Save as Draft
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}