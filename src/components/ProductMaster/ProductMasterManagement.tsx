import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AddProductModal } from "./AddProductModal";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye, 
  Filter,
  Download,
  Package,
  Gem,
  Star,
  AlertTriangle
} from "lucide-react";

const sampleProducts = [
  {
    id: "SKU001",
    itemName: "Gold Diamond Ring",
    category: "Gold",
    metalPurity: "22K",
    grossWeight: "5.2g",
    netWeight: "4.8g",
    wastage: "8%",
    stoneCharges: "₹2,500",
    hsnCode: "7113",
    makingCharges: "₹800/g",
    stockInHand: 12,
    status: "In Stock"
  },
  {
    id: "SKU002", 
    itemName: "Silver Chain",
    category: "Silver",
    metalPurity: "925",
    grossWeight: "15.8g",
    netWeight: "15.0g",
    wastage: "5%",
    stoneCharges: "₹0",
    hsnCode: "7113",
    makingCharges: "₹50/g",
    stockInHand: 8,
    status: "Low Stock"
  },
  {
    id: "SKU003",
    itemName: "Diamond Earrings",
    category: "Diamond",
    metalPurity: "18K",
    grossWeight: "3.5g",
    netWeight: "3.2g",
    wastage: "10%",
    stoneCharges: "₹15,000",
    hsnCode: "7102",
    makingCharges: "15%",
    stockInHand: 0,
    status: "Out of Stock"
  }
];

export function ProductMasterManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ["All", "Gold", "Silver", "Diamond", "Platinum"];

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-success/10 text-success border-success/20";
      case "Low Stock": return "bg-warning/10 text-warning border-warning/20";
      case "Out of Stock": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Product Master</h2>
          <p className="text-muted-foreground">Manage your product catalog with detailed specifications</p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-primary">847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Gem className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold text-success">724</p>
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
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-warning">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-gold">12</p>
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
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <Card
            key={product.id}
            className="hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.itemName}
                    </h3>
                    <p className="text-sm text-muted-foreground">SKU: {product.id}</p>
                  </div>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purity:</span>
                    <span className="font-medium">{product.metalPurity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Weight:</span>
                    <span className="font-medium">{product.grossWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Weight:</span>
                    <span className="font-medium">{product.netWeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wastage:</span>
                    <span className="font-medium">{product.wastage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HSN Code:</span>
                    <span className="font-medium">{product.hsnCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock:</span>
                    <span className={`font-bold ${product.stockInHand === 0 ? 'text-destructive' : product.stockInHand <= 5 ? 'text-warning' : 'text-success'}`}>
                      {product.stockInHand}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Making Charges:</span>
                    <span className="font-medium">{product.makingCharges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stone Charges:</span>
                    <span className="font-bold text-primary">{product.stoneCharges}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddProductModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
}