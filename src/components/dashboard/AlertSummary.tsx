import { AlertTriangle, Shield, Clock, Database, Link2Off } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertItem {
  label: string;
  count: number;
  severity: "critical" | "warning" | "info";
  icon: React.ReactNode;
}

const alerts: AlertItem[] = [
  {
    label: "Critical Alerts",
    count: 2,
    severity: "critical",
    icon: <AlertTriangle className="w-4 h-4" />
  },
  {
    label: "Compliance Issues",
    count: 5,
    severity: "warning",
    icon: <Shield className="w-4 h-4" />
  },
  {
    label: "Overdue Tasks",
    count: 12,
    severity: "warning",
    icon: <Clock className="w-4 h-4" />
  },
  {
    label: "Data Quality Issues",
    count: 8,
    severity: "info",
    icon: <Database className="w-4 h-4" />
  },
  {
    label: "Integration Issues",
    count: 3,
    severity: "warning",
    icon: <Link2Off className="w-4 h-4" />
  },
];

export function AlertSummary() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Alert Summary</h3>
        <button className="text-xs font-medium text-info hover:underline">View All</button>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.label}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
              alert.severity === "critical" && "bg-danger-muted hover:bg-danger/10",
              alert.severity === "warning" && "bg-warning-muted hover:bg-warning/10",
              alert.severity === "info" && "bg-info-muted hover:bg-info/10"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center",
              alert.severity === "critical" && "bg-danger text-danger-foreground",
              alert.severity === "warning" && "bg-warning text-warning-foreground",
              alert.severity === "info" && "bg-info text-info-foreground"
            )}>
              {alert.icon}
            </div>
            
            <span className="flex-1 text-sm font-medium text-foreground">{alert.label}</span>
            
            <span className={cn(
              "text-lg font-bold",
              alert.severity === "critical" && "text-danger",
              alert.severity === "warning" && "text-warning",
              alert.severity === "info" && "text-info"
            )}>
              {alert.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
