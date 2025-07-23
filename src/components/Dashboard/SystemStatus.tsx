import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  Shield, 
  Clock, 
  Users,
  Activity
} from "lucide-react";

export function SystemStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Real-time Sync */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
              <Wifi className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="font-medium text-sm">Real-time Sync Across Devices & Stores</p>
              <p className="text-xs text-muted-foreground">All 8 stores connected</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success">
            2 sec ago
          </Badge>
        </div>

        {/* Security */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Bank-Grade Security</p>
              <p className="text-xs text-muted-foreground">256-bit encryption</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success">
            Secured
          </Badge>
        </div>

        {/* Uptime */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-warning" />
            </div>
            <div>
              <p className="font-medium text-sm">System Uptime</p>
              <p className="text-xs text-muted-foreground">24/7 Support Available</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-warning/10 text-warning">
            99.99%
          </Badge>
        </div>

        {/* Active Users */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Active Users</p>
              <p className="text-xs text-muted-foreground">Currently online</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            12 users
          </Badge>
        </div>

        {/* Gold Rate Update */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gold/5 border border-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-medium text-sm">Live Gold Rate</p>
              <p className="text-xs text-muted-foreground">₹6,850/g</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success">
            +₹25 today
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}