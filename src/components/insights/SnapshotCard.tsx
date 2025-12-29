import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SnapshotCardProps {
  label: string;
  value: string;
  change?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  detail?: string;
  icon: React.ReactNode;
  accentColor?: "healthy" | "informational" | "attention" | "default";
  tooltip?: string;
}

export function SnapshotCard({ 
  label, 
  value, 
  change, 
  detail,
  icon,
  accentColor = "default",
  tooltip
}: SnapshotCardProps) {
  const card = (
    <div className="surface-card-hover p-5 group">
      <div className="flex items-start justify-between mb-4">
        <span className="metric-label">{label}</span>
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105",
          accentColor === "healthy" && "bg-healthy-muted text-healthy",
          accentColor === "informational" && "bg-informational-muted text-informational",
          accentColor === "attention" && "bg-attention-muted text-attention",
          accentColor === "default" && "bg-secondary text-muted-foreground"
        )}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-1.5">
        <p className="metric-value">{value}</p>
        
        <div className="flex items-center gap-2 flex-wrap">
          {change && (
            <span className={cn(
              "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
              change.direction === "up" && "badge-healthy",
              change.direction === "down" && "badge-critical",
              change.direction === "neutral" && "bg-secondary text-muted-foreground"
            )}>
              {change.direction === "up" && <TrendingUp className="w-3 h-3" />}
              {change.direction === "down" && <TrendingDown className="w-3 h-3" />}
              {change.direction === "neutral" && <Minus className="w-3 h-3" />}
              {change.value}
            </span>
          )}
          {detail && (
            <span className="text-xs text-muted-foreground">{detail}</span>
          )}
        </div>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{card}</TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px]">
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return card;
}
