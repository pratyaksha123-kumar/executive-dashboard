import { 
  FileBarChart, 
  Plus, 
  Download,
  TrendingUp,
  Users2,
  Target,
  Zap,
  FileText,
  BarChart3,
  PieChart,
  Settings2,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const reportBuilderStats = [
  { label: "Available Reports", value: "47" },
  { label: "Scheduled Reports", value: "12" },
  { label: "Custom Dashboards", value: "8" },
  { label: "Reports Generated", value: "156" },
];

const quickFilters = ["Executive Summary", "Client Analytics", "Advisor Performance", "Operational", "Compliance"];

const reportCategories = [
  {
    title: "Executive Summary Reports",
    icon: FileBarChart,
    color: "text-informational",
    reports: [
      { name: "Firm Performance Overview", description: "Comprehensive firm metrics and KPIs" },
      { name: "Client Relationship Health", description: "Engagement trends and risk indicators" },
      { name: "Operational Efficiency", description: "Process metrics and optimization" },
    ]
  },
  {
    title: "Client Analytics Reports",
    icon: Users2,
    color: "text-attention",
    reports: [
      { name: "Client Engagement Analysis", description: "Communication patterns and touchpoints" },
      { name: "AUM Growth Distribution", description: "Portfolio growth and allocation trends" },
      { name: "Service Delivery Quality", description: "Response times and satisfaction metrics" },
    ]
  },
  {
    title: "Advisor Performance",
    icon: Target,
    color: "text-primary",
    reports: [
      { name: "Individual Metrics", description: "Advisor-specific performance data" },
      { name: "Team Comparison", description: "Comparative analysis across teams" },
      { name: "Productivity Analysis", description: "Efficiency and output metrics" },
    ]
  },
  {
    title: "Operational Reports",
    icon: Zap,
    color: "text-healthy",
    reports: [
      { name: "Process Efficiency", description: "Workflow analytics and bottlenecks" },
      { name: "Task Completion Tracking", description: "Department and individual progress" },
      { name: "Resource Utilization", description: "Team and personnel optimization" },
    ]
  },
  {
    title: "Compliance Reports",
    icon: FileText,
    color: "text-critical",
    reports: [
      { name: "Regulatory Status", description: "Current compliance standing" },
      { name: "Audit Preparation", description: "Readiness assessment and gaps" },
      { name: "Policy Adherence", description: "Monitoring and violation tracking" },
    ]
  },
];

const kpiMetrics = [
  { label: "Total AUM", value: "$847M", change: "+12.5% QoQ", trend: "up" },
  { label: "Active Clients", value: "284", change: "+8.3% YoY", trend: "up" },
  { label: "Client Satisfaction", value: "94.2%", change: "+2.1% MTD", trend: "up" },
  { label: "Process Efficiency", value: "87%", change: "+3.4% QoQ", trend: "up" },
];

export function ReportsAnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Custom reporting and business intelligence with executive summaries and operational analytics
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium text-foreground">
          <Download className="w-4 h-4" />
          Export Dashboard
        </button>
      </div>

      {/* Custom Report Builder Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Custom Report Builder</h3>
              <p className="text-sm text-muted-foreground">Create custom reports by combining data from multiple systems</p>
            </div>
            <div className="flex items-center gap-6">
              {reportBuilderStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" />
                Build New Report
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground mr-2">Quick Filters:</span>
        {quickFilters.map((filter, index) => (
          <button
            key={filter}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              index === 0 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Report Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportCategories.map((category) => (
          <Card key={category.title} className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <category.icon className={cn("w-4 h-4", category.color)} />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report) => (
                  <div 
                    key={report.name}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{report.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{report.description}</p>
                    </div>
                    <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      View →
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Performance Metrics */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Key Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiMetrics.map((metric) => (
              <div 
                key={metric.label}
                className="p-4 rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border/50"
              >
                <p className="text-2xl font-bold text-primary mb-1">{metric.value}</p>
                <p className="text-sm text-foreground">{metric.label}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-healthy" />
                  <span className="text-xs text-healthy">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Reporting Agent */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-attention/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-attention" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">Anthony - Billing & Reporting Agent</h4>
                <Badge variant="secondary" className="text-[10px]">AI Assistant for Custom Reports</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Recent Analysis</p>
                  <p className="text-sm text-foreground">Generated Q2 revenue breakdown by household. Found 8 accounts needing fee adjustments.</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">Review Report</button>
                    <button className="px-3 py-1 bg-secondary text-foreground rounded text-xs">Schedule Meeting</button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Available Reports</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-muted-foreground" />Custom AUM analysis and breakdowns</li>
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-muted-foreground" />Performance metrics compilation</li>
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-muted-foreground" />Revenue attribution analysis</li>
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-muted-foreground" />Operational metrics tracking</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Quick Actions</p>
                  <ul className="text-sm text-primary space-y-1">
                    <li className="hover:underline cursor-pointer">→ Generate revenue report</li>
                    <li className="hover:underline cursor-pointer">→ AUM growth analysis</li>
                    <li className="hover:underline cursor-pointer">→ Fee reconciliation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}