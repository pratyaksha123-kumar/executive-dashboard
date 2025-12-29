import { Activity, Link2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemMetric {
  label: string;
  value: string;
  status: "success" | "warning" | "danger";
  icon: React.ReactNode;
  description: string;
}

const systemMetrics: SystemMetric[] = [
  {
    label: "System Uptime",
    value: "99.97%",
    status: "success",
    icon: <Activity className="w-4 h-4" />,
    description: "Last 30 days"
  },
  {
    label: "Integrations Active",
    value: "12/14",
    status: "warning",
    icon: <Link2 className="w-4 h-4" />,
    description: "2 need attention"
  },
  {
    label: "Sync Issues",
    value: "3",
    status: "danger",
    icon: <AlertCircle className="w-4 h-4" />,
    description: "Requires action"
  },
];

export function SystemPerformance() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <h3 className="text-base font-semibold text-foreground mb-5">System Performance</h3>
      
      <div className="space-y-4">
        {systemMetrics.map((metric) => (
          <div 
            key={metric.label}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              metric.status === "success" && "bg-success-muted text-success",
              metric.status === "warning" && "bg-warning-muted text-warning",
              metric.status === "danger" && "bg-danger-muted text-danger"
            )}>
              {metric.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{metric.label}</p>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
            
            <div className="text-right">
              <p className={cn(
                "text-lg font-bold",
                metric.status === "success" && "text-success",
                metric.status === "warning" && "text-warning",
                metric.status === "danger" && "text-danger"
              )}>
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
