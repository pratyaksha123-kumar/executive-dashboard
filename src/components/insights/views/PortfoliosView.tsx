import { Wallet, TrendingUp, TrendingDown, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const portfolioStats = [
  { label: "Total Portfolios", value: "892", change: "+12", direction: "up" },
  { label: "Avg. Return YTD", value: "+8.4%", change: "+1.2%", direction: "up" },
  { label: "Under Performance", value: "34", change: "-8", direction: "down" },
  { label: "Rebalancing Due", value: "67", change: "+15", direction: "up" },
];

const allocationData = [
  { name: "Equities", value: 42, color: "hsl(166, 76%, 42%)" },
  { name: "Fixed Income", value: 28, color: "hsl(221, 83%, 53%)" },
  { name: "Alternatives", value: 18, color: "hsl(280, 67%, 60%)" },
  { name: "Cash", value: 12, color: "hsl(43, 96%, 56%)" },
];

const topPortfolios = [
  { name: "Growth Aggressive", assets: "$1.2B", return: "+12.4%", risk: "High" },
  { name: "Balanced Income", assets: "$2.1B", return: "+7.8%", risk: "Medium" },
  { name: "Conservative Shield", assets: "$1.8B", return: "+4.2%", risk: "Low" },
  { name: "ESG Focus", assets: "$890M", return: "+9.1%", risk: "Medium" },
];

export function PortfoliosView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-1">Portfolio Management</h2>
        <p className="text-sm text-muted-foreground">
          Monitor portfolio performance, allocations, and rebalancing needs
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {portfolioStats.map((stat) => (
          <div key={stat.label} className="surface-card p-5">
            <span className="metric-label">{stat.label}</span>
            <div className="flex items-end justify-between mt-2">
              <p className="metric-value">{stat.value}</p>
              <span className={cn(
                "text-xs font-medium flex items-center gap-0.5",
                stat.direction === "up" ? "text-healthy" : "text-critical"
              )}>
                {stat.direction === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Asset Allocation */}
        <div className="surface-card p-6">
          <h3 className="section-title mb-5">Asset Allocation Overview</h3>
          <div className="flex items-center gap-6">
            <div className="w-[180px] h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                            <p className="text-xs font-medium">{payload[0].name}: {payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Portfolios */}
        <div className="surface-card p-6">
          <h3 className="section-title mb-5">Top Performing Portfolios</h3>
          <div className="space-y-3">
            {topPortfolios.map((portfolio, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{portfolio.name}</p>
                  <p className="text-xs text-muted-foreground">{portfolio.assets}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-healthy">{portfolio.return}</p>
                  <p className="text-[10px] text-muted-foreground">{portfolio.risk} Risk</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
