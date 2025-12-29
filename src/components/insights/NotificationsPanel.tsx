import { AlertTriangle, Shield, ClipboardList, Database, Unplug } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NotificationItem {
  label: string;
  count: number;
  severity: "critical" | "attention" | "informational";
  icon: React.ReactNode;
  description: string;
}

export const notifications: NotificationItem[] = [
  {
    label: "High Priority Signals",
    count: 3,
    severity: "critical",
    icon: <AlertTriangle className="w-4 h-4" />,
    description: "Urgent items requiring immediate executive attention"
  },
  {
    label: "Policy Exceptions",
    count: 7,
    severity: "attention",
    icon: <Shield className="w-4 h-4" />,
    description: "Compliance policy deviations flagged for review"
  },
  {
    label: "Pending Actions",
    count: 15,
    severity: "attention",
    icon: <ClipboardList className="w-4 h-4" />,
    description: "Tasks awaiting completion or approval"
  },
  {
    label: "Validation Flags",
    count: 11,
    severity: "informational",
    icon: <Database className="w-4 h-4" />,
    description: "Data quality issues identified for correction"
  },
  {
    label: "Connectivity Alerts",
    count: 2,
    severity: "attention",
    icon: <Unplug className="w-4 h-4" />,
    description: "Integration or API connection issues detected"
  },
];

export function NotificationsPanel() {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="section-title">Risk & Notifications</h3>
        <button className="text-xs font-medium text-accent hover:underline">View All</button>
      </div>
      
      <div className="space-y-2.5">
        {notifications.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <div 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                  item.severity === "critical" && "bg-critical-muted hover:bg-critical/10",
                  item.severity === "attention" && "bg-attention-muted hover:bg-attention/10",
                  item.severity === "informational" && "bg-informational-muted hover:bg-informational/10"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
                  item.severity === "critical" && "bg-critical text-critical-foreground",
                  item.severity === "attention" && "bg-attention text-attention-foreground",
                  item.severity === "informational" && "bg-informational text-informational-foreground"
                )}>
                  {item.icon}
                </div>
                
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                
                <span className={cn(
                  "text-lg font-bold tabular-nums",
                  item.severity === "critical" && "text-critical",
                  item.severity === "attention" && "text-attention",
                  item.severity === "informational" && "text-informational"
                )}>
                  {item.count}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[200px]">
              <p className="text-xs">{item.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
