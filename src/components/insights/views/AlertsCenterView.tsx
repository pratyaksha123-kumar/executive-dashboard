import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2,
  Clock,
  Filter,
  Bell,
  ShieldAlert,
  Database,
  Link2,
  FileWarning
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AlertSeverity = "critical" | "warning" | "info" | "resolved";

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: string;
  timestamp: string;
  source: string;
  icon: React.ElementType;
}

const alerts: Alert[] = [
  {
    id: 1,
    title: "Compliance Deadline Approaching",
    description: "Annual regulatory filing due in 3 days. Documentation review required.",
    severity: "critical",
    category: "Compliance",
    timestamp: "2 hours ago",
    source: "Compliance System",
    icon: ShieldAlert
  },
  {
    id: 2,
    title: "Data Sync Failure - CRM Connector",
    description: "Failed to sync client data from CRM. Last successful sync: 6 hours ago.",
    severity: "critical",
    category: "Integration",
    timestamp: "3 hours ago",
    source: "Integration Hub",
    icon: Link2
  },
  {
    id: 3,
    title: "High-Value Client Risk Alert",
    description: "Westbrook Family Office showing decreased engagement metrics.",
    severity: "warning",
    category: "Client",
    timestamp: "5 hours ago",
    source: "Relationship Monitor",
    icon: AlertTriangle
  },
  {
    id: 4,
    title: "Portfolio Rebalancing Due",
    description: "15 client portfolios require quarterly rebalancing review.",
    severity: "warning",
    category: "Operations",
    timestamp: "1 day ago",
    source: "Portfolio Engine",
    icon: FileWarning
  },
  {
    id: 5,
    title: "Database Maintenance Scheduled",
    description: "Planned maintenance window: Sunday 2:00 AM - 4:00 AM EST.",
    severity: "info",
    category: "System",
    timestamp: "1 day ago",
    source: "IT Operations",
    icon: Database
  },
  {
    id: 6,
    title: "New Client Onboarding Complete",
    description: "Horizon Capital Partners successfully onboarded and account activated.",
    severity: "resolved",
    category: "Onboarding",
    timestamp: "2 days ago",
    source: "Onboarding System",
    icon: CheckCircle2
  },
];

const alertCounts = [
  { label: "Critical", count: 4, color: "bg-critical text-critical-foreground" },
  { label: "Warnings", count: 12, color: "bg-attention text-attention-foreground" },
  { label: "Informational", count: 8, color: "bg-informational text-informational-foreground" },
  { label: "Resolved Today", count: 6, color: "bg-healthy text-healthy-foreground" },
];

const filterOptions = ["All", "Critical", "Warning", "Info", "Resolved"];

export function AlertsCenterView() {
  const getSeverityStyles = (severity: AlertSeverity) => {
    switch (severity) {
      case "critical":
        return {
          badge: "border-critical text-critical bg-critical/10",
          icon: "text-critical",
          border: "border-l-critical"
        };
      case "warning":
        return {
          badge: "border-attention text-attention bg-attention/10",
          icon: "text-attention",
          border: "border-l-attention"
        };
      case "info":
        return {
          badge: "border-informational text-informational bg-informational/10",
          icon: "text-informational",
          border: "border-l-informational"
        };
      case "resolved":
        return {
          badge: "border-healthy text-healthy bg-healthy/10",
          icon: "text-healthy",
          border: "border-l-healthy"
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Alerts Center</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and manage system notifications, warnings, and critical alerts
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          Configure Alerts
        </button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {alertCounts.map((item) => (
          <Card key={item.label} className="bg-card border-border">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                <Badge className={cn("text-xs font-bold", item.color)}>
                  {item.count}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Bar */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option, index) => (
                <button
                  key={option}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Alerts</CardTitle>
            <button className="text-sm text-primary hover:underline">Mark All Read</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const styles = getSeverityStyles(alert.severity);
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors border-l-4",
                    styles.border
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("p-2 rounded-lg bg-secondary flex-shrink-0", styles.icon)}>
                      <alert.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={cn("text-xs", styles.badge)}>
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Badge variant="secondary" className="text-[10px]">{alert.category}</Badge>
                        </span>
                        <span>Source: {alert.source}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-md text-xs font-medium text-foreground transition-colors">
                        View
                      </button>
                      {alert.severity !== "resolved" && (
                        <button className="px-3 py-1.5 bg-primary hover:bg-primary/90 rounded-md text-xs font-medium text-primary-foreground transition-colors">
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}