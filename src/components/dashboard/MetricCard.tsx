import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
    label?: string;
  };
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon,
  variant = "default" 
}: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 card-shadow card-hover border border-border/50">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && (
          <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            variant === "success" && "bg-success-muted text-success",
            variant === "warning" && "bg-warning-muted text-warning",
            variant === "danger" && "bg-danger-muted text-danger",
            variant === "info" && "bg-info-muted text-info",
            variant === "default" && "bg-secondary text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
        
        {(subtitle || trend) && (
          <div className="flex items-center gap-2">
            {trend && (
              <span className={cn(
                "inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded",
                trend.direction === "up" 
                  ? "bg-success-muted text-success" 
                  : "bg-danger-muted text-danger"
              )}>
                {trend.direction === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {trend.value}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-muted-foreground">{subtitle}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
