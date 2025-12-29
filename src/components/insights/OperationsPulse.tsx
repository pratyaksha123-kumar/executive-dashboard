import { cn } from "@/lib/utils";
import { CheckCircle, Clock, FileSearch, Gauge, Timer } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface OperationMetric {
  label: string;
  value: string;
  progress?: number;
  status: "healthy" | "attention" | "critical";
  icon: React.ReactNode;
  description: string;
}

const operationMetrics: OperationMetric[] = [
  {
    label: "Intake Funnel",
    value: "47 Active",
    progress: 72,
    status: "healthy",
    icon: <Clock className="w-4 h-4" />,
    description: "New accounts in onboarding pipeline across all stages"
  },
  {
    label: "Workflow Completion",
    value: "91%",
    progress: 91,
    status: "healthy",
    icon: <CheckCircle className="w-4 h-4" />,
    description: "Percentage of workflows completed on time this period"
  },
  {
    label: "Information Accuracy",
    value: "96.8%",
    progress: 97,
    status: "healthy",
    icon: <FileSearch className="w-4 h-4" />,
    description: "Data quality score across all client records"
  },
  {
    label: "Efficiency Score",
    value: "82%",
    progress: 82,
    status: "attention",
    icon: <Gauge className="w-4 h-4" />,
    description: "Overall operational efficiency index"
  },
  {
    label: "Avg. Processing Time",
    value: "1.8 days",
    progress: 88,
    status: "healthy",
    icon: <Timer className="w-4 h-4" />,
    description: "Average time to process standard requests"
  },
];

export function OperationsPulse() {
  return (
    <div className="surface-card p-6">
      <h3 className="section-title mb-5">Operations Pulse</h3>
      
      <div className="space-y-4">
        {operationMetrics.map((metric) => (
          <Tooltip key={metric.label}>
            <TooltipTrigger asChild>
              <div className="space-y-2.5 cursor-help">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      metric.status === "healthy" && "bg-healthy-muted text-healthy",
                      metric.status === "attention" && "bg-attention-muted text-attention",
                      metric.status === "critical" && "bg-critical-muted text-critical"
                    )}>
                      {metric.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground">{metric.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground tabular-nums">{metric.value}</span>
                </div>
                
                {metric.progress !== undefined && (
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out",
                        metric.status === "healthy" && "bg-healthy",
                        metric.status === "attention" && "bg-attention",
                        metric.status === "critical" && "bg-critical"
                      )}
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-[220px]">
              <p className="text-xs">{metric.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
