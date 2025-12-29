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
  Legend
} from "recharts";

const aumData = [
  { month: "Jul", aum: 7.2, clients: 1180 },
  { month: "Aug", aum: 7.5, clients: 1195 },
  { month: "Sep", aum: 7.8, clients: 1210 },
  { month: "Oct", aum: 8.0, clients: 1225 },
  { month: "Nov", aum: 8.2, clients: 1238 },
  { month: "Dec", aum: 8.4, clients: 1248 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-muted-foreground">
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.name}: 
            </span>{" "}
            {entry.name === "AUM" ? `$${entry.value}B` : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function PerformanceChart() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">AUM & Client Growth</h3>
          <p className="text-xs text-muted-foreground mt-1">6-month trend analysis</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-info" />
            <span className="text-muted-foreground">AUM ($B)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Clients</span>
          </div>
        </div>
      </div>
      
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={aumData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="aumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="clientGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 69%, 41%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152, 69%, 41%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis 
              dataKey="month" 
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
              dataKey="aum"
              name="AUM"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#aumGradient)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="clients"
              name="Clients"
              stroke="hsl(152, 69%, 41%)"
              strokeWidth={2}
              fill="url(#clientGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
