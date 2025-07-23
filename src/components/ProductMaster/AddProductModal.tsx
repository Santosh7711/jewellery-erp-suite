import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    sku: "",
    itemName: "",
    category: "",
    metalPurity: "",
    grossWeight: "",
    netWeight: "",
    wastagePercent: "",
    stoneCharges: "",
    hsnCode: "",
    makingChargesType: "",
    makingChargesValue: "",
    stockInHand: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.sku || !formData.itemName || !formData.category) {
      toast.error("SKU, Item Name, and Category are required!");
      return;
    }

    // Simulate API call
    console.log("Adding product:", formData);
    toast.success("Product added successfully!");
    
    // Reset form and close modal
    setFormData({
      sku: "",
      itemName: "",
      category: "",
      metalPurity: "",
      grossWeight: "",
      netWeight: "",
      wastagePercent: "",
      stoneCharges: "",
      hsnCode: "",
      makingChargesType: "",
      makingChargesValue: "",
      stockInHand: "",
      description: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Item Code *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  placeholder="SKU001"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                  placeholder="Gold Diamond Ring"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="diamond">Diamond</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="gemstone">Gemstone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metalPurity">Metal Purity</Label>
                <Select value={formData.metalPurity} onValueChange={(value) => handleInputChange("metalPurity", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24k">24K</SelectItem>
                    <SelectItem value="22k">22K</SelectItem>
                    <SelectItem value="18k">18K</SelectItem>
                    <SelectItem value="14k">14K</SelectItem>
                    <SelectItem value="925">925 Silver</SelectItem>
                    <SelectItem value="999">999 Silver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Weight & Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">Weight & Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grossWeight">Gross Weight (g)</Label>
                <Input
                  id="grossWeight"
                  value={formData.grossWeight}
                  onChange={(e) => handleInputChange("grossWeight", e.target.value)}
                  placeholder="5.2"
                  type="number"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="netWeight">Net Weight (g)</Label>
                <Input
                  id="netWeight"
                  value={formData.netWeight}
                  onChange={(e) => handleInputChange("netWeight", e.target.value)}
                  placeholder="4.8"
                  type="number"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wastagePercent">Wastage %</Label>
                <Input
                  id="wastagePercent"
                  value={formData.wastagePercent}
                  onChange={(e) => handleInputChange("wastagePercent", e.target.value)}
                  placeholder="8"
                  type="number"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Charges & Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">Charges & Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stoneCharges">Stone Charges (₹)</Label>
                <Input
                  id="stoneCharges"
                  value={formData.stoneCharges}
                  onChange={(e) => handleInputChange("stoneCharges", e.target.value)}
                  placeholder="2500"
                  type="number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hsnCode">HSN Code</Label>
                <Select value={formData.hsnCode} onValueChange={(value) => handleInputChange("hsnCode", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select HSN Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7102">7102 - Diamonds</SelectItem>
                    <SelectItem value="7103">7103 - Precious stones</SelectItem>
                    <SelectItem value="7108">7108 - Gold</SelectItem>
                    <SelectItem value="7113">7113 - Articles of jewellery</SelectItem>
                    <SelectItem value="7114">7114 - Articles of goldsmiths</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="makingChargesType">Making Charges Type</Label>
                <Select value={formData.makingChargesType} onValueChange={(value) => handleInputChange("makingChargesType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per_gram">Per Gram (₹/g)</SelectItem>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="makingChargesValue">Making Charges Value</Label>
                <Input
                  id="makingChargesValue"
                  value={formData.makingChargesValue}
                  onChange={(e) => handleInputChange("makingChargesValue", e.target.value)}
                  placeholder="800"
                  type="number"
                />
              </div>
            </div>
          </div>

          {/* Stock & Additional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">Stock & Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stockInHand">Stock in Hand</Label>
                <Input
                  id="stockInHand"
                  value={formData.stockInHand}
                  onChange={(e) => handleInputChange("stockInHand", e.target.value)}
                  placeholder="10"
                  type="number"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Additional product details..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Product
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}