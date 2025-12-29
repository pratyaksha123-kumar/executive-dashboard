import { 
  Users2, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Phone, 
  Mail, 
  Calendar,
  MoreHorizontal,
  Search,
  Filter,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const clientData = [
  { 
    id: 1, 
    name: "Harrison Capital Group", 
    aum: "$42.5M", 
    status: "active", 
    health: 92, 
    advisor: "Sarah Mitchell",
    lastContact: "2 days ago",
    segment: "Ultra High Net Worth"
  },
  { 
    id: 2, 
    name: "Westbrook Family Office", 
    aum: "$38.2M", 
    status: "active", 
    health: 88, 
    advisor: "James Chen",
    lastContact: "1 week ago",
    segment: "Family Office"
  },
  { 
    id: 3, 
    name: "Meridian Holdings LLC", 
    aum: "$28.7M", 
    status: "at-risk", 
    health: 54, 
    advisor: "Michael Torres",
    lastContact: "3 weeks ago",
    segment: "Institutional"
  },
  { 
    id: 4, 
    name: "Northstar Investments", 
    aum: "$22.1M", 
    status: "active", 
    health: 85, 
    advisor: "Emily Parker",
    lastContact: "Yesterday",
    segment: "High Net Worth"
  },
  { 
    id: 5, 
    name: "Phoenix Wealth Partners", 
    aum: "$19.8M", 
    status: "critical", 
    health: 32, 
    advisor: "David Kim",
    lastContact: "1 month ago",
    segment: "High Net Worth"
  },
];

const summaryMetrics = [
  { label: "Total Clients", value: "1,624", change: "+48", trend: "up" },
  { label: "Active Relationships", value: "1,456", change: "+32", trend: "up" },
  { label: "At-Risk Accounts", value: "127", change: "-8", trend: "down" },
  { label: "Avg. Satisfaction", value: "4.6/5", change: "+0.2", trend: "up" },
];

export function ClientManagementView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Client Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and manage all client relationships across your portfolio
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric) => (
          <Card key={metric.label} className="bg-card border-border">
            <CardContent className="pt-5 pb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{metric.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  metric.trend === "up" && metric.label !== "At-Risk Accounts" ? "text-healthy" : 
                  metric.trend === "down" && metric.label === "At-Risk Accounts" ? "text-healthy" : "text-critical"
                )}>
                  {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search clients by name, advisor, or segment..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Client Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Client Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Client</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">AUM</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Health</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Advisor</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Last Contact</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientData.map((client) => (
                  <tr key={client.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground text-sm">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.segment}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-foreground">{client.aum}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          client.status === "active" && "border-healthy text-healthy bg-healthy/10",
                          client.status === "at-risk" && "border-attention text-attention bg-attention/10",
                          client.status === "critical" && "border-critical text-critical bg-critical/10"
                        )}
                      >
                        {client.status === "active" ? "Active" : client.status === "at-risk" ? "At Risk" : "Critical"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={client.health} 
                          className={cn(
                            "h-1.5 w-16",
                            client.health >= 70 ? "[&>div]:bg-healthy" : 
                            client.health >= 40 ? "[&>div]:bg-attention" : "[&>div]:bg-critical"
                          )}
                        />
                        <span className="text-xs text-muted-foreground">{client.health}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-foreground">{client.advisor}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">{client.lastContact}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 hover:bg-secondary rounded transition-colors" aria-label="Call">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-secondary rounded transition-colors" aria-label="Email">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-secondary rounded transition-colors" aria-label="Schedule">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-secondary rounded transition-colors" aria-label="More">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}