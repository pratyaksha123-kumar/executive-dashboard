import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IntegrationStatus {
  name: string;
  shortName: string;
  status: "healthy" | "attention" | "critical";
  lastActivity: string;
  category: string;
  description: string;
}

const integrationsList: IntegrationStatus[] = [
  {
    name: "CRM Connector",
    shortName: "CRM",
    status: "healthy",
    lastActivity: "Just now",
    category: "Customer Data",
    description: "Customer relationship and contact management sync"
  },
  {
    name: "Portfolio Engine",
    shortName: "PE",
    status: "healthy",
    lastActivity: "3 min ago",
    category: "Investments",
    description: "Investment portfolio and performance data feed"
  },
  {
    name: "Planning Tool",
    shortName: "PT",
    status: "attention",
    lastActivity: "18 min ago",
    category: "Financial Planning",
    description: "Financial planning and projections platform"
  },
  {
    name: "Custody Interface",
    shortName: "CI",
    status: "healthy",
    lastActivity: "1 min ago",
    category: "Custodial",
    description: "Custodial account data and transaction sync"
  },
];

export function IntegrationStatusBoard() {
  return (
    <div className="surface-card p-6">
      <h3 className="section-title mb-5">Integration Status Board</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {integrationsList.map((integration) => (
          <Tooltip key={integration.name}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors cursor-help">
                <div className={cn(
                  "w-11 h-11 rounded-lg font-bold text-sm flex items-center justify-center flex-shrink-0",
                  integration.status === "healthy" && "bg-healthy text-healthy-foreground",
                  integration.status === "attention" && "bg-attention text-attention-foreground",
                  integration.status === "critical" && "bg-critical text-critical-foreground"
                )}>
                  {integration.shortName}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{integration.name}</p>
                    <span className={cn(
                      "status-indicator flex-shrink-0",
                      integration.status === "healthy" && "status-healthy",
                      integration.status === "attention" && "status-attention",
                      integration.status === "critical" && "status-critical"
                    )} />
                  </div>
                  <p className="text-[11px] text-muted-foreground">{integration.lastActivity}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px]">
              <div>
                <p className="font-medium text-xs">{integration.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{integration.description}</p>
                <p className="text-xs mt-1.5">
                  <span className="text-muted-foreground">Category:</span> {integration.category}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
