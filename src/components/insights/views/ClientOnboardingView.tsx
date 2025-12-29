import { 
  UserPlus, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ArrowRight,
  Calendar,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const pipelineStages = [
  { name: "Initial Contact", count: 8, color: "bg-informational" },
  { name: "Documentation", count: 12, color: "bg-attention" },
  { name: "Compliance Review", count: 5, color: "bg-primary" },
  { name: "Account Setup", count: 3, color: "bg-healthy" },
];

const onboardingClients = [
  {
    id: 1,
    name: "Sterling Investments LLC",
    contact: "Robert Sterling",
    stage: "Documentation",
    progress: 45,
    daysInStage: 3,
    priority: "high",
    expectedAum: "$15.2M",
    assignedTo: "Sarah Mitchell"
  },
  {
    id: 2,
    name: "Cascade Family Trust",
    contact: "Margaret Cascade",
    stage: "Compliance Review",
    progress: 72,
    daysInStage: 2,
    priority: "medium",
    expectedAum: "$8.7M",
    assignedTo: "James Chen"
  },
  {
    id: 3,
    name: "Horizon Capital Partners",
    contact: "Daniel Horizon",
    stage: "Account Setup",
    progress: 90,
    daysInStage: 1,
    priority: "high",
    expectedAum: "$22.4M",
    assignedTo: "Emily Parker"
  },
  {
    id: 4,
    name: "Evergreen Wealth Mgmt",
    contact: "Lisa Evergreen",
    stage: "Initial Contact",
    progress: 15,
    daysInStage: 5,
    priority: "low",
    expectedAum: "$4.1M",
    assignedTo: "Michael Torres"
  },
  {
    id: 5,
    name: "Atlas Holdings Group",
    contact: "Thomas Atlas",
    stage: "Documentation",
    progress: 55,
    daysInStage: 4,
    priority: "medium",
    expectedAum: "$12.8M",
    assignedTo: "David Kim"
  },
];

const summaryStats = [
  { label: "In Pipeline", value: "28", icon: UserPlus, color: "text-informational" },
  { label: "Avg. Time to Complete", value: "14 days", icon: Clock, color: "text-attention" },
  { label: "Completed This Month", value: "12", icon: CheckCircle2, color: "text-healthy" },
  { label: "Requiring Attention", value: "5", icon: AlertCircle, color: "text-critical" },
];

export function ClientOnboardingView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Client Onboarding</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track new client acquisitions through the onboarding pipeline
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <div className={cn("p-2 rounded-lg bg-secondary", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Overview */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Pipeline Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {pipelineStages.map((stage, index) => (
              <div key={stage.name} className="flex-1 flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">{stage.name}</span>
                    <Badge variant="secondary" className="text-xs">{stage.count}</Badge>
                  </div>
                  <div className={cn("h-2 rounded-full", stage.color)} />
                </div>
                {index < pipelineStages.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Onboarding */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Active Onboarding</CardTitle>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {onboardingClients.map((client) => (
              <div 
                key={client.id} 
                className="p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">{client.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          client.priority === "high" && "border-critical text-critical",
                          client.priority === "medium" && "border-attention text-attention",
                          client.priority === "low" && "border-muted-foreground text-muted-foreground"
                        )}
                      >
                        {client.priority} priority
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {client.contact}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        {client.stage}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {client.daysInStage} days in stage
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Expected AUM</p>
                      <p className="font-semibold text-foreground">{client.expectedAum}</p>
                    </div>
                    
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium text-foreground">{client.progress}%</span>
                      </div>
                      <Progress 
                        value={client.progress} 
                        className={cn(
                          "h-1.5",
                          client.progress >= 70 ? "[&>div]:bg-healthy" : 
                          client.progress >= 40 ? "[&>div]:bg-attention" : "[&>div]:bg-informational"
                        )}
                      />
                    </div>
                    
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}