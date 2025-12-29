import { BarChart3, TrendingUp, Users, DollarSign, Target, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 2.1, target: 2.0 },
  { month: "Feb", revenue: 2.3, target: 2.1 },
  { month: "Mar", revenue: 2.2, target: 2.2 },
  { month: "Apr", revenue: 2.5, target: 2.3 },
  { month: "May", revenue: 2.7, target: 2.4 },
  { month: "Jun", revenue: 2.9, target: 2.5 },
];

const segmentData = [
  { segment: "UHNW", value: 42 },
  { segment: "HNW", value: 31 },
  { segment: "Affluent", value: 18 },
  { segment: "Mass", value: 9 },
];

const insightMetrics = [
  { label: "Revenue Growth", value: "+14.2%", icon: TrendingUp, color: "healthy" },
  { label: "Client Acquisition", value: "156", icon: Users, color: "informational" },
  { label: "Avg. Revenue/Client", value: "$18.4K", icon: DollarSign, color: "healthy" },
  { label: "Goal Attainment", value: "94%", icon: Target, color: "healthy" },
];

export function InsightsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-1">Business Insights</h2>
        <p className="text-sm text-muted-foreground">
          Deep analytics on revenue, growth trends, and business performance
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insightMetrics.map((metric) => (
          <div key={metric.label} className="surface-card p-5 group">
            <div className="flex items-center justify-between mb-3">
              <span className="metric-label">{metric.label}</span>
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105",
                metric.color === "healthy" && "bg-healthy-muted text-healthy",
                metric.color === "informational" && "bg-informational-muted text-informational"
              )}>
                <metric.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="metric-value">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue Trend */}
        <div className="surface-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Revenue vs Target</h3>
              <p className="text-xs text-muted-foreground mt-1">Monthly comparison (in millions)</p>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} tickFormatter={(v) => `$${v}M`} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border rounded-lg p-2.5 shadow-lg">
                          <p className="text-xs font-medium mb-1">{label}</p>
                          <p className="text-xs text-healthy">Revenue: ${payload[0].value}M</p>
                          <p className="text-xs text-muted-foreground">Target: ${payload[1].value}M</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(166, 76%, 42%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="target" stroke="hsl(220, 9%, 70%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment Distribution */}
        <div className="surface-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Client Segmentation</h3>
              <p className="text-xs text-muted-foreground mt-1">Distribution by wealth tier</p>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
                <XAxis dataKey="segment" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                          <p className="text-xs font-medium">{payload[0].payload.segment}: {payload[0].value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ fill: 'hsl(220, 14%, 96%)' }}
                />
                <Bar dataKey="value" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
