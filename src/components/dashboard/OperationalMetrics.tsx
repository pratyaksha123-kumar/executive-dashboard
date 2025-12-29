import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertTriangle, Zap, FileCheck } from "lucide-react";

interface MetricItem {
  label: string;
  value: string | number;
  progress?: number;
  status?: "success" | "warning" | "danger";
  icon: React.ReactNode;
}

const metrics: MetricItem[] = [
  {
    label: "Onboarding Pipeline",
    value: "24 Active",
    progress: 68,
    status: "success",
    icon: <Clock className="w-4 h-4" />
  },
  {
    label: "Task Completion Rate",
    value: "87%",
    progress: 87,
    status: "success",
    icon: <CheckCircle2 className="w-4 h-4" />
  },
  {
    label: "Data Quality Score",
    value: "94.2%",
    progress: 94,
    status: "success",
    icon: <FileCheck className="w-4 h-4" />
  },
  {
    label: "Process Efficiency",
    value: "78%",
    progress: 78,
    status: "warning",
    icon: <Zap className="w-4 h-4" />
  },
  {
    label: "Document Processing",
    value: "2.4 hrs avg",
    progress: 85,
    status: "success",
    icon: <AlertTriangle className="w-4 h-4" />
  },
];

export function OperationalMetrics() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <h3 className="text-base font-semibold text-foreground mb-5">Operational Metrics</h3>
      
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center",
                  metric.status === "success" && "bg-success-muted text-success",
                  metric.status === "warning" && "bg-warning-muted text-warning",
                  metric.status === "danger" && "bg-danger-muted text-danger"
                )}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{metric.value}</span>
            </div>
            
            {metric.progress !== undefined && (
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    metric.status === "success" && "bg-success",
                    metric.status === "warning" && "bg-warning",
                    metric.status === "danger" && "bg-danger"
                  )}
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
