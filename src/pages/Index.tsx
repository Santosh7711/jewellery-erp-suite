import { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { SalesChart } from "@/components/Dashboard/SalesChart";
import { RecentTransactions } from "@/components/Dashboard/RecentTransactions";
import { GirviManagement } from "@/components/Dashboard/GirviManagement";
import { SystemStatus } from "@/components/Dashboard/SystemStatus";
import { CustomerManagement } from "@/components/Customers/CustomerManagement";
import { InventoryManagement } from "@/components/Inventory/InventoryManagement";
import { GirviManagementFull } from "@/components/Girvi/GirviManagementFull";
import { ProductMasterManagement } from "@/components/ProductMaster/ProductMasterManagement";
import { GoldRateManagement } from "@/components/GoldRate/GoldRateManagement";
import { BillingModule } from "@/components/Billing/BillingModule";
import { ReportsModule } from "@/components/Reports/ReportsModule";
import { 
  IndianRupee, 
  Users, 
  Target, 
  TrendingUp,
  Package,
  ShoppingCart
} from "lucide-react";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check for system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', darkMode ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <main className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Welcome Manglam Jewellers
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here's what's happening with your business today.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg border border-gold/20 animate-bounce-gentle">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gold-foreground">
                  GOLD LIVE ₹6,850/g
                </span>
                <span className="text-xs text-success">+₹25</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <StatsCard
                  title="Total Sales"
                  value="₹2.14Cr"
                  change="+12.5%"
                  trend="up"
                  color="primary"
                  icon={<IndianRupee className="w-5 h-5" />}
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <StatsCard
                  title="Customers"
                  value="67,780"
                  change="+8.2%"
                  trend="up"
                  color="success"
                  icon={<Users className="w-5 h-5" />}
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <StatsCard
                  title="Profit"
                  value="₹5.25L"
                  change="+15.3%"
                  trend="up"
                  color="gold"
                  icon={<TrendingUp className="w-5 h-5" />}
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <StatsCard
                  title="Goal Achieved"
                  value="86%"
                  color="warning"
                  icon={<Target className="w-5 h-5" />}
                />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Charts and Analytics */}
              <div className="lg:col-span-2 space-y-6">
                <div className="animate-scale-in" style={{ animationDelay: '500ms' }}>
                  <SalesChart />
                </div>
                
                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '600ms' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cash Available</p>
                        <p className="text-lg font-bold text-success">₹1,44,580</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '700ms' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue Monthly</p>
                        <p className="text-lg font-bold text-warning">₹96.56K</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '800ms' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Orders Pending</p>
                        <p className="text-lg font-bold text-destructive">24</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '900ms' }}>
                  <RecentTransactions />
                </div>
              </div>

              {/* Right Column - Girvi and System Status */}
              <div className="space-y-6">
                <div className="animate-slide-up" style={{ animationDelay: '1000ms' }}>
                  <GirviManagement />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '1100ms' }}>
                  <SystemStatus />
                </div>
              </div>
            </div>
          </main>
        );
      case "customers":
        return (
          <main className="p-6">
            <CustomerManagement />
          </main>
        );
      case "product-master":
        return (
          <main className="p-6">
            <ProductMasterManagement />
          </main>
        );
      case "gold-rate":
        return (
          <main className="p-6">
            <GoldRateManagement />
          </main>
        );
      case "billing":
        return (
          <main className="p-6">
            <BillingModule />
          </main>
        );
      case "inventory":
        return (
          <main className="p-6">
            <InventoryManagement />
          </main>
        );
      case "girvi":
        return (
          <main className="p-6">
            <GirviManagementFull />
          </main>
        );
      case "sales":
        return (
          <main className="p-6">
            <BillingModule />
          </main>
        );
      case "reports":
        return (
          <main className="p-6">
            <ReportsModule />
          </main>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {renderContent()}
    </div>
  );
};

export default Index;