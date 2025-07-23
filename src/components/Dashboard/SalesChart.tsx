import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { day: "Mon", amount: 210 },
  { day: "Tue", amount: 280 },
  { day: "Wed", amount: 150 },
  { day: "Thu", amount: 320 },
  { day: "Fri", amount: 380 },
  { day: "Sat", amount: 250 },
  { day: "Sun", amount: 180 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Overall Gold Sales</CardTitle>
        <p className="text-sm text-muted-foreground">This week</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-sm"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-sm"
                tickFormatter={(value) => `₹${value}L`}
              />
              <Tooltip 
                formatter={(value) => [`₹${value}L`, "Sales"]}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}