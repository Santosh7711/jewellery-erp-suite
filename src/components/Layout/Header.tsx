import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Settings, 
  Search, 
  Menu,
  Sun,
  Moon,
  BarChart3,
  Users,
  Package,
  CreditCard,
  ShoppingCart,
  TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ darkMode, toggleDarkMode, activeTab, setActiveTab }: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center animate-pulse-glow">
            <span className="text-primary-foreground font-bold text-sm">💎</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Gehna ERP
          </h1>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6 ml-8">
          <Button 
            variant={activeTab === "dashboard" ? "default" : "ghost"} 
            size="sm" 
            className="gap-2 transition-all duration-300 hover:scale-105"
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </Button>
          <Button 
            variant={activeTab === "inventory" ? "default" : "ghost"} 
            size="sm" 
            className="gap-2 transition-all duration-300 hover:scale-105"
            onClick={() => setActiveTab("inventory")}
          >
            <Package className="w-4 h-4" />
            Inventory
          </Button>
          <Button 
            variant={activeTab === "customers" ? "default" : "ghost"} 
            size="sm" 
            className="gap-2 transition-all duration-300 hover:scale-105"
            onClick={() => setActiveTab("customers")}
          >
            <Users className="w-4 h-4" />
            Customers
          </Button>
          <Button 
            variant={activeTab === "girvi" ? "default" : "ghost"} 
            size="sm" 
            className="gap-2 transition-all duration-300 hover:scale-105"
            onClick={() => setActiveTab("girvi")}
          >
            <CreditCard className="w-4 h-4" />
            Girvi
          </Button>
          <Button 
            variant={activeTab === "sales" ? "default" : "ghost"} 
            size="sm" 
            className="gap-2 transition-all duration-300 hover:scale-105"
            onClick={() => setActiveTab("sales")}
          >
            <ShoppingCart className="w-4 h-4" />
            Sales
          </Button>
          <Button 
            variant={activeTab === "reports" ? "default" : "ghost"} 
            size="sm" 
            className="gap-2 transition-all duration-300 hover:scale-105"
            onClick={() => setActiveTab("reports")}
          >
            <TrendingUp className="w-4 h-4" />
            Reports
          </Button>
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers, items, orders..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Gold Rate */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg border border-gold/20 animate-bounce-gentle">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gold-foreground">
              Gold ₹6,850/g
            </span>
            <span className="text-xs text-success">+₹25</span>
          </div>

          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleDarkMode}
            className="w-9 h-9 p-0 transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            {darkMode ? 
              <Sun className="w-4 h-4 text-warning" /> : 
              <Moon className="w-4 h-4 text-primary" />
            }
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative w-9 h-9 p-0 transition-all duration-300 hover:scale-110">
            <Bell className="w-4 h-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs animate-bounce-gentle"
            >
              3
            </Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0 transition-all duration-300 hover:scale-110 hover:rotate-90">
            <Settings className="w-4 h-4" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/50">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">MJ</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">Manglam Jewellers</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>

          {/* Mobile Menu */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden w-9 h-9 p-0"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t bg-card p-4 animate-slide-up">
          <nav className="flex flex-col gap-2">
            <Button 
              variant={activeTab === "dashboard" ? "default" : "ghost"} 
              className="justify-start gap-2"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === "inventory" ? "default" : "ghost"} 
              className="justify-start gap-2"
              onClick={() => setActiveTab("inventory")}
            >
              <Package className="w-4 h-4" />
              Inventory
            </Button>
            <Button 
              variant={activeTab === "customers" ? "default" : "ghost"} 
              className="justify-start gap-2"
              onClick={() => setActiveTab("customers")}
            >
              <Users className="w-4 h-4" />
              Customers
            </Button>
            <Button 
              variant={activeTab === "girvi" ? "default" : "ghost"} 
              className="justify-start gap-2"
              onClick={() => setActiveTab("girvi")}
            >
              <CreditCard className="w-4 h-4" />
              Girvi
            </Button>
            <Button 
              variant={activeTab === "sales" ? "default" : "ghost"} 
              className="justify-start gap-2"
              onClick={() => setActiveTab("sales")}
            >
              <ShoppingCart className="w-4 h-4" />
              Sales
            </Button>
            <Button 
              variant={activeTab === "reports" ? "default" : "ghost"} 
              className="justify-start gap-2"
              onClick={() => setActiveTab("reports")}
            >
              <TrendingUp className="w-4 h-4" />
              Reports
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}