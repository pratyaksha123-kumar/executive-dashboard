import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Integration {
  name: string;
  status: "online" | "degraded" | "offline";
  lastSync: string;
  logo: string;
  description: string;
}

const integrations: Integration[] = [
  {
    name: "HubSpot CRM",
    status: "online",
    lastSync: "2 min ago",
    logo: "H",
    description: "Client relationship management and sales pipeline"
  },
  {
    name: "Addepar",
    status: "online",
    lastSync: "5 min ago",
    logo: "A",
    description: "Portfolio management and performance reporting"
  },
  {
    name: "eMoney",
    status: "degraded",
    lastSync: "23 min ago",
    logo: "E",
    description: "Financial planning and wealth management"
  },
  {
    name: "Schwab",
    status: "online",
    lastSync: "1 min ago",
    logo: "S",
    description: "Custodial services and trading platform"
  },
];

export function IntegrationHealth() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <h3 className="text-base font-semibold text-foreground mb-5">System Integration Health</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {integrations.map((integration) => (
          <Tooltip key={integration.name}>
            <TooltipTrigger asChild>
              <div 
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center",
                  integration.status === "online" && "bg-success text-success-foreground",
                  integration.status === "degraded" && "bg-warning text-warning-foreground",
                  integration.status === "offline" && "bg-danger text-danger-foreground"
                )}>
                  {integration.logo}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{integration.name}</p>
                    <span className={cn(
                      "status-dot flex-shrink-0",
                      integration.status === "online" && "status-online",
                      integration.status === "degraded" && "status-warning",
                      integration.status === "offline" && "status-offline"
                    )} />
                  </div>
                  <p className="text-xs text-muted-foreground">{integration.lastSync}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div>
                <p className="font-medium">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.description}</p>
                <p className="text-xs mt-1">
                  Status: <span className={cn(
                    "font-medium",
                    integration.status === "online" && "text-success",
                    integration.status === "degraded" && "text-warning",
                    integration.status === "offline" && "text-danger"
                  )}>{integration.status}</span>
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
