import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Edit, 
  Save,
  History,
  RefreshCw,
  IndianRupee
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const goldRates = [
  { purity: "24K", rate: 6850, change: 25, changePercent: 0.37 },
  { purity: "22K", rate: 6280, change: 23, changePercent: 0.37 },
  { purity: "18K", rate: 5140, change: 19, changePercent: 0.37 },
  { purity: "14K", rate: 3990, change: 15, changePercent: 0.38 }
];

const silverRates = [
  { purity: "999", rate: 82, change: 1.2, changePercent: 1.49 },
  { purity: "925", rate: 76, change: 1.1, changePercent: 1.47 }
];

const rateHistory = [
  { date: "2024-05-20", "24K": 6850, "22K": 6280, "18K": 5140 },
  { date: "2024-05-19", "24K": 6825, "22K": 6257, "18K": 5121 },
  { date: "2024-05-18", "24K": 6800, "22K": 6234, "18K": 5100 },
  { date: "2024-05-17", "24K": 6775, "22K": 6211, "18K": 5079 },
  { date: "2024-05-16", "24K": 6750, "22K": 6188, "18K": 5058 }
];

export function GoldRateManagement() {
  const [editMode, setEditMode] = useState(false);
  const [tempRates, setTempRates] = useState(goldRates);
  const [tempSilverRates, setTempSilverRates] = useState(silverRates);

  const handleSaveRates = () => {
    // Simulate API call
    console.log("Saving rates:", { gold: tempRates, silver: tempSilverRates });
    toast.success("Gold rates updated successfully!");
    setEditMode(false);
  };

  const handleRateChange = (index: number, newRate: string, type: 'gold' | 'silver') => {
    const rate = parseFloat(newRate) || 0;
    if (type === 'gold') {
      const updated = [...tempRates];
      updated[index] = { ...updated[index], rate };
      setTempRates(updated);
    } else {
      const updated = [...tempSilverRates];
      updated[index] = { ...updated[index], rate };
      setTempSilverRates(updated);
    }
  };

  const getTrendIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  const getTrendColor = (change: number) => {
    return change >= 0 ? "text-success" : "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gold Rate Master</h2>
          <p className="text-muted-foreground">Manage daily gold and silver rates</p>
        </div>
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button onClick={handleSaveRates} className="gap-2">
                <Save className="w-4 h-4" />
                Save Rates
              </Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)} className="gap-2">
              <Edit className="w-4 h-4" />
              Update Rates
            </Button>
          )}
        </div>
      </div>

      {/* Current Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gold Rates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-gold" />
              </div>
              Gold Rates (per gram)
            </CardTitle>
            <Badge className="bg-success/10 text-success">
              Live
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {(editMode ? tempRates : goldRates).map((rate, index) => (
              <div key={rate.purity} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                    <span className="font-bold text-gold text-sm">{rate.purity}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{rate.purity} Gold</p>
                    <p className="text-sm text-muted-foreground">Per gram</p>
                  </div>
                </div>
                <div className="text-right">
                  {editMode ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">₹</span>
                      <Input
                        type="number"
                        value={rate.rate}
                        onChange={(e) => handleRateChange(index, e.target.value, 'gold')}
                        className="w-24 text-right"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-xl font-bold">₹{rate.rate.toLocaleString()}</p>
                      <div className="flex items-center gap-1 justify-end">
                        {getTrendIcon(rate.change)}
                        <span className={`text-sm font-medium ${getTrendColor(rate.change)}`}>
                          ₹{Math.abs(rate.change)} ({rate.changePercent}%)
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Silver Rates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-muted-foreground" />
              </div>
              Silver Rates (per gram)
            </CardTitle>
            <Badge className="bg-success/10 text-success">
              Live
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {(editMode ? tempSilverRates : silverRates).map((rate, index) => (
              <div key={rate.purity} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center">
                    <span className="font-bold text-muted-foreground text-sm">{rate.purity}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{rate.purity} Silver</p>
                    <p className="text-sm text-muted-foreground">Per gram</p>
                  </div>
                </div>
                <div className="text-right">
                  {editMode ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">₹</span>
                      <Input
                        type="number"
                        value={rate.rate}
                        onChange={(e) => handleRateChange(index, e.target.value, 'silver')}
                        className="w-24 text-right"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-xl font-bold">₹{rate.rate}</p>
                      <div className="flex items-center gap-1 justify-end">
                        {getTrendIcon(rate.change)}
                        <span className={`text-sm font-medium ${getTrendColor(rate.change)}`}>
                          ₹{Math.abs(rate.change)} ({rate.changePercent}%)
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Rate History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Rate History (Last 5 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Date</th>
                  <th className="text-right p-3">24K Gold</th>
                  <th className="text-right p-3">22K Gold</th>
                  <th className="text-right p-3">18K Gold</th>
                </tr>
              </thead>
              <tbody>
                {rateHistory.map((day, index) => (
                  <tr key={day.date} className={`border-b ${index === 0 ? 'bg-primary/5' : ''}`}>
                    <td className="p-3 font-medium">
                      {new Date(day.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                      {index === 0 && <Badge className="ml-2 text-xs">Today</Badge>}
                    </td>
                    <td className="p-3 text-right font-semibold">₹{day["24K"].toLocaleString()}</td>
                    <td className="p-3 text-right font-semibold">₹{day["22K"].toLocaleString()}</td>
                    <td className="p-3 text-right font-semibold">₹{day["18K"].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync with Market
            </Button>
            <Button variant="outline" className="gap-2">
              <History className="w-4 h-4" />
              View Full History
            </Button>
            <Button variant="outline" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Rate Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}