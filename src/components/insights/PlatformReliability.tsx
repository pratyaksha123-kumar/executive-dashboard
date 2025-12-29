import { Server, Link, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ReliabilityMetric {
  label: string;
  value: string;
  status: "healthy" | "attention" | "critical";
  icon: React.ReactNode;
  detail: string;
  description: string;
}

const reliabilityMetrics: ReliabilityMetric[] = [
  {
    label: "Service Availability",
    value: "99.98%",
    status: "healthy",
    icon: <Server className="w-4 h-4" />,
    detail: "Rolling 30-day average",
    description: "Platform uptime across all services and regions"
  },
  {
    label: "Active Connections",
    value: "11 of 13",
    status: "attention",
    icon: <Link className="w-4 h-4" />,
    detail: "2 require attention",
    description: "External data feeds and API connections status"
  },
  {
    label: "Sync Warnings",
    value: "4",
    status: "attention",
    icon: <AlertTriangle className="w-4 h-4" />,
    detail: "Action recommended",
    description: "Data synchronization issues needing review"
  },
];

export function PlatformReliability() {
  return (
    <div className="surface-card p-6">
      <h3 className="section-title mb-5">Platform Reliability</h3>
      
      <div className="space-y-3">
        {reliabilityMetrics.map((metric) => (
          <Tooltip key={metric.label}>
            <TooltipTrigger asChild>
              <div 
                className={cn(
                  "flex items-center gap-4 p-3.5 rounded-lg transition-colors cursor-help",
                  "bg-secondary/60 hover:bg-secondary"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  metric.status === "healthy" && "bg-healthy-muted text-healthy",
                  metric.status === "attention" && "bg-attention-muted text-attention",
                  metric.status === "critical" && "bg-critical-muted text-critical"
                )}>
                  {metric.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.detail}</p>
                </div>
                
                <p className={cn(
                  "text-xl font-bold tabular-nums",
                  metric.status === "healthy" && "text-healthy",
                  metric.status === "attention" && "text-attention",
                  metric.status === "critical" && "text-critical"
                )}>
                  {metric.value}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[200px]">
              <p className="text-xs">{metric.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
