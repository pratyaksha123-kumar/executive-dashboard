import { Users, AlertCircle, ShieldAlert, MessageSquare, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RelationshipMetric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "healthy" | "attention" | "critical" | "informational" | "default";
  subtext: string;
  description: string;
}

const relationshipMetrics: RelationshipMetric[] = [
  {
    label: "Highly Engaged",
    value: 186,
    icon: <Users className="w-4 h-4" />,
    color: "healthy",
    subtext: "Last 14 days",
    description: "Accounts with frequent platform activity and communications"
  },
  {
    label: "Attention Needed",
    value: 23,
    icon: <AlertCircle className="w-4 h-4" />,
    color: "attention",
    subtext: "Declining activity",
    description: "Accounts showing reduced engagement patterns"
  },
  {
    label: "Critical Attention",
    value: 8,
    icon: <ShieldAlert className="w-4 h-4" />,
    color: "critical",
    subtext: "Requires action",
    description: "High-value accounts at risk of churn"
  },
  {
    label: "Interaction Index",
    value: "5.1/mo",
    icon: <MessageSquare className="w-4 h-4" />,
    color: "informational",
    subtext: "Per account avg",
    description: "Average touchpoints per account monthly"
  },
  {
    label: "Experience Rating",
    value: "4.7",
    icon: <ThumbsUp className="w-4 h-4" />,
    color: "healthy",
    subtext: "Out of 5.0",
    description: "Client satisfaction score from recent surveys"
  },
];

export function RelationshipHealth() {
  return (
    <div className="surface-card p-6">
      <h3 className="section-title mb-5">Relationship Health Overview</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {relationshipMetrics.map((metric) => (
          <Tooltip key={metric.label}>
            <TooltipTrigger asChild>
              <div className="text-center p-4 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors cursor-help">
                <div className={cn(
                  "w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center",
                  metric.color === "healthy" && "bg-healthy-muted text-healthy",
                  metric.color === "attention" && "bg-attention-muted text-attention",
                  metric.color === "critical" && "bg-critical-muted text-critical",
                  metric.color === "informational" && "bg-informational-muted text-informational",
                  metric.color === "default" && "bg-secondary text-muted-foreground"
                )}>
                  {metric.icon}
                </div>
                <p className="text-xl font-bold text-foreground mb-0.5 tabular-nums">{metric.value}</p>
                <p className="text-xs font-medium text-foreground">{metric.label}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{metric.subtext}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[180px]">
              <p className="text-xs">{metric.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
