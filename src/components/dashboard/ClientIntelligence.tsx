import { Users, AlertTriangle, ShieldAlert, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientMetric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "success" | "warning" | "danger" | "info" | "default";
  subtext?: string;
}

const clientMetrics: ClientMetric[] = [
  {
    label: "High Engagement",
    value: 142,
    icon: <Users className="w-4 h-4" />,
    color: "success",
    subtext: "Active last 7 days"
  },
  {
    label: "At Risk",
    value: 18,
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "warning",
    subtext: "Low engagement"
  },
  {
    label: "High Risk",
    value: 6,
    icon: <ShieldAlert className="w-4 h-4" />,
    color: "danger",
    subtext: "Immediate attention"
  },
  {
    label: "Avg Communication",
    value: "4.2/mo",
    icon: <MessageCircle className="w-4 h-4" />,
    color: "info",
    subtext: "Per client"
  },
  {
    label: "Service Quality",
    value: "4.8",
    icon: <Star className="w-4 h-4" />,
    color: "success",
    subtext: "Out of 5.0"
  },
];

export function ClientIntelligence() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <h3 className="text-base font-semibold text-foreground mb-5">Client Intelligence Summary</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {clientMetrics.map((metric) => (
          <div 
            key={metric.label}
            className="text-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className={cn(
              "w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center",
              metric.color === "success" && "bg-success-muted text-success",
              metric.color === "warning" && "bg-warning-muted text-warning",
              metric.color === "danger" && "bg-danger-muted text-danger",
              metric.color === "info" && "bg-info-muted text-info",
              metric.color === "default" && "bg-secondary text-muted-foreground"
            )}>
              {metric.icon}
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
            <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
            {metric.subtext && (
              <p className="text-[10px] text-muted-foreground/70 mt-1">{metric.subtext}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
