import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AddItemModal } from "./AddItemModal";
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

const sampleInventory = [
  {
    id: "JR001",
    name: "Gold Diamond Ring",
    category: "Rings",
    weight: "5.2g",
    purity: "22K",
    stones: "0.5ct Diamond",
    quantity: 12,
    costPrice: "₹25,000",
    sellingPrice: "₹32,000",
    status: "In Stock",
    lastUpdated: "2 hours ago"
  },
  {
    id: "JN002", 
    name: "Pearl Necklace Set",
    category: "Necklaces",
    weight: "15.8g",
    purity: "18K",
    stones: "Freshwater Pearls",
    quantity: 8,
    costPrice: "₹18,000",
    sellingPrice: "₹24,000",
    status: "Low Stock",
    lastUpdated: "1 day ago"
  },
  {
    id: "JE003",
    name: "Emerald Drop Earrings",
    category: "Earrings",
    weight: "3.5g",
    purity: "18K",
    stones: "Natural Emerald",
    quantity: 0,
    costPrice: "₹15,000",
    sellingPrice: "₹20,000",
    status: "Out of Stock",
    lastUpdated: "3 days ago"
  },
  {
    id: "JB004",
    name: "Gold Chain Bracelet",
    category: "Bracelets",
    weight: "8.2g",
    purity: "22K",
    stones: "None",
    quantity: 25,
    costPrice: "₹12,000",
    sellingPrice: "₹16,000",
    status: "In Stock",
    lastUpdated: "1 hour ago"
  },
  {
    id: "JP005",
    name: "Ruby Pendant",
    category: "Pendants",
    weight: "2.8g",
    purity: "18K",
    stones: "0.8ct Ruby",
    quantity: 5,
    costPrice: "₹22,000",
    sellingPrice: "₹28,000",
    status: "Low Stock",
    lastUpdated: "6 hours ago"
  }
];

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Pendants"];
  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"];

  const filteredInventory = sampleInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-success/10 text-success border-success/20";
      case "Low Stock": return "bg-warning/10 text-warning border-warning/20";
      case "Out of Stock": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock": return <Package className="w-3 h-3" />;
      case "Low Stock": return <AlertTriangle className="w-3 h-3" />;
      case "Out of Stock": return <Trash className="w-3 h-3" />;
      default: return <Package className="w-3 h-3" />;
    }
  };

  const totalValue = sampleInventory.reduce((sum, item) => {
    const price = parseInt(item.sellingPrice.replace(/[₹,]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inventory Management</h2>
          <p className="text-muted-foreground">Track and manage your jewellery stock</p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-primary">1,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Gem className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold text-success">1,524</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
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

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-gold">₹{(totalValue / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by item name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
            
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <span className="text-sm font-medium text-muted-foreground self-center">Category:</span>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-200"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <span className="text-sm font-medium text-muted-foreground self-center">Status:</span>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item, index) => (
          <Card
            key={item.id}
            className="hover:shadow-lg transition-all duration-300 animate-scale-in group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{item.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purity:</span>
                    <span className="font-medium">{item.purity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stones:</span>
                    <span className="font-medium">{item.stones}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className={`font-bold ${item.quantity === 0 ? 'text-destructive' : item.quantity <= 5 ? 'text-warning' : 'text-success'}`}>
                      {item.quantity}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cost Price:</span>
                    <span className="font-medium">{item.costPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selling Price:</span>
                    <span className="font-bold text-primary">{item.sellingPrice}</span>
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

                {/* Last Updated */}
                <p className="text-xs text-muted-foreground">
                  Updated {item.lastUpdated}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddItemModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
}