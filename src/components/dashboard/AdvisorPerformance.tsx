import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const advisorData = [
  { name: "J. Smith", aum: 1.2, clients: 38, color: "hsl(217, 91%, 60%)" },
  { name: "M. Chen", aum: 1.05, clients: 32, color: "hsl(217, 91%, 55%)" },
  { name: "S. Patel", aum: 0.95, clients: 28, color: "hsl(217, 91%, 50%)" },
  { name: "R. Johnson", aum: 0.88, clients: 31, color: "hsl(217, 91%, 45%)" },
  { name: "L. Williams", aum: 0.82, clients: 26, color: "hsl(217, 91%, 40%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-info">AUM:</span> ${data.aum}B
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-success">Clients:</span> {data.clients}
        </p>
      </div>
    );
  }
  return null;
};

export function AdvisorPerformance() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Top Advisors by AUM</h3>
          <p className="text-xs text-muted-foreground mt-1">Assets under management (billions)</p>
        </div>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={advisorData} 
            layout="vertical"
            margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" horizontal={true} vertical={false} />
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
              width={55}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(220, 14%, 96%)' }} />
            <Bar 
              dataKey="aum" 
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {advisorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
