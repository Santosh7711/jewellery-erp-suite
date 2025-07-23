import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  color?: "primary" | "success" | "warning" | "gold";
  icon?: React.ReactNode;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  trend, 
  color = "primary",
  icon 
}: StatsCardProps) {
  const colorClasses = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    gold: "text-gold"
  };

  const trendColorClasses = {
    up: "text-success",
    down: "text-destructive"
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <p className={cn("text-2xl font-bold", colorClasses[color])}>
                {value}
              </p>
              {change && trend && (
                <div className={cn("flex items-center gap-1 text-sm", trendColorClasses[trend])}>
                  {trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {change}
                </div>
              )}
            </div>
          </div>
          {icon && (
            <div className={cn("p-3 rounded-full bg-muted", colorClasses[color])}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}