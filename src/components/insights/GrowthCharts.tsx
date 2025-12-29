import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

const growthData = [
  { period: "Jul", assets: 6.8, accounts: 1420 },
  { period: "Aug", assets: 7.1, accounts: 1465 },
  { period: "Sep", assets: 7.4, accounts: 1512 },
  { period: "Oct", assets: 7.6, accounts: 1548 },
  { period: "Nov", assets: 7.9, accounts: 1589 },
  { period: "Dec", assets: 8.2, accounts: 1624 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs font-semibold text-foreground mb-1.5">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[11px] text-muted-foreground">
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.name}: 
            </span>{" "}
            {entry.name === "Assets" ? `$${entry.value}B` : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function GrowthTrendsChart() {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Assets & Account Growth</h3>
          <p className="text-xs text-muted-foreground mt-1">6-month rolling trend</p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-muted-foreground">Assets ($B)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-informational" />
            <span className="text-muted-foreground">Accounts</span>
          </div>
        </div>
      </div>
      
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={growthData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="assetsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(166, 76%, 42%)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(166, 76%, 42%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="accountsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }}
              tickFormatter={(value) => `$${value}B`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="assets"
              name="Assets"
              stroke="hsl(166, 76%, 42%)"
              strokeWidth={2}
              fill="url(#assetsGradient)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="accounts"
              name="Accounts"
              stroke="hsl(221, 83%, 53%)"
              strokeWidth={2}
              fill="url(#accountsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const advisorPerformance = [
  { name: "M. Rodriguez", value: 1.35 },
  { name: "K. Thompson", value: 1.12 },
  { name: "J. Park", value: 0.98 },
  { name: "A. Williams", value: 0.91 },
  { name: "S. Gupta", value: 0.85 },
];

export function AdvisorLeaderboard() {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Top Advisors by Assets</h3>
          <p className="text-xs text-muted-foreground mt-1">Current quarter performance</p>
        </div>
      </div>
      
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={advisorPerformance} 
            layout="vertical"
            margin={{ top: 5, right: 20, left: 70, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" horizontal vertical={false} />
            <XAxis 
              type="number"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }}
              tickFormatter={(value) => `$${value}B`}
            />
            <YAxis 
              type="category"
              dataKey="name"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }}
              width={65}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-2.5 shadow-lg">
                      <p className="text-xs font-medium text-foreground">{payload[0].payload.name}</p>
                      <p className="text-xs text-muted-foreground">Assets: ${payload[0].value}B</p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ fill: 'hsl(220, 14%, 96%)' }} 
            />
            <Bar 
              dataKey="value" 
              fill="hsl(166, 76%, 42%)"
              radius={[0, 4, 4, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
