import { 
  Users2, 
  TrendingUp, 
  Target, 
  Award,
  Clock,
  DollarSign,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const performanceData = [
  { name: "Sarah Mitchell", clients: 52, aum: 245, target: 90 },
  { name: "James Chen", clients: 48, aum: 198, target: 85 },
  { name: "Emily Parker", clients: 45, aum: 187, target: 92 },
  { name: "Michael Torres", clients: 41, aum: 165, target: 78 },
  { name: "David Kim", clients: 38, aum: 142, target: 82 },
];

const monthlyTrends = [
  { month: "Jul", productivity: 78, satisfaction: 82 },
  { month: "Aug", productivity: 82, satisfaction: 85 },
  { month: "Sep", productivity: 79, satisfaction: 83 },
  { month: "Oct", productivity: 85, satisfaction: 87 },
  { month: "Nov", productivity: 88, satisfaction: 89 },
  { month: "Dec", productivity: 91, satisfaction: 91 },
];

const departmentData = [
  { name: "Advisory", value: 38, color: "hsl(var(--primary))" },
  { name: "Operations", value: 24, color: "hsl(var(--healthy))" },
  { name: "Compliance", value: 12, color: "hsl(var(--attention))" },
  { name: "Support", value: 18, color: "hsl(var(--informational))" },
];

const summaryMetrics = [
  { label: "Total Employees", value: "92", icon: Users2, color: "text-informational", change: "+4" },
  { label: "Avg. Performance", value: "86%", icon: Target, color: "text-healthy", change: "+3.2%" },
  { label: "Top Performers", value: "18", icon: Award, color: "text-attention", change: "+2" },
  { label: "Avg. Tenure", value: "4.2 yrs", icon: Clock, color: "text-primary", change: "+0.3" },
];

export function EmployeeAnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Employee Analytics</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Workforce performance metrics and team productivity insights
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric) => (
          <Card key={metric.label} className="bg-card border-border">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{metric.label}</p>
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className="text-xs text-healthy ml-2">{metric.change}</span>
                </div>
                <div className={cn("p-2 rounded-lg bg-secondary", metric.color)}>
                  <metric.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Advisor Performance */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Advisor Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11} 
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="aum" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="AUM ($M)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Productivity Trends */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-healthy" />
              Productivity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productivity" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                  name="Productivity %"
                />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="hsl(var(--healthy))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--healthy))' }}
                  name="Satisfaction %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Department Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Department Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: dept.color }}
                      />
                      <span className="text-sm text-foreground">{dept.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{dept.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-attention" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.slice(0, 5).map((advisor, index) => (
                <div key={advisor.name} className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                    index === 0 ? "bg-attention/20 text-attention" :
                    index === 1 ? "bg-muted text-muted-foreground" :
                    index === 2 ? "bg-amber-900/20 text-amber-600" :
                    "bg-secondary text-muted-foreground"
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{advisor.name}</p>
                    <p className="text-xs text-muted-foreground">{advisor.clients} clients • ${advisor.aum}M AUM</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={advisor.target} 
                        className="h-1.5 w-16 [&>div]:bg-primary"
                      />
                      <span className="text-xs font-medium text-foreground">{advisor.target}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}