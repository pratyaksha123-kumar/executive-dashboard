import { Users2, UserPlus, UserCheck, UserX, Mail, Phone, Building2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const relationshipStats = [
  { label: "Total Accounts", value: "1,624", icon: Users2, color: "informational" },
  { label: "New This Month", value: "47", icon: UserPlus, color: "healthy" },
  { label: "Active", value: "1,512", icon: UserCheck, color: "healthy" },
  { label: "Inactive", value: "112", icon: UserX, color: "attention" },
];

const recentAccounts = [
  { name: "Blackstone Holdings LLC", type: "Institutional", assets: "$24.5M", status: "Active", contact: "J. Morrison" },
  { name: "Chen Family Trust", type: "Family Office", assets: "$18.2M", status: "Active", contact: "M. Chen" },
  { name: "Apex Ventures Inc", type: "Corporate", assets: "$12.8M", status: "Onboarding", contact: "R. Patel" },
  { name: "Williams Estate", type: "Estate", assets: "$9.4M", status: "Active", contact: "S. Williams" },
  { name: "Nordic Investment Group", type: "Institutional", assets: "$31.2M", status: "Under Review", contact: "E. Larsson" },
];

export function RelationshipsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-1">Relationship Management</h2>
        <p className="text-sm text-muted-foreground">
          Monitor and manage client relationships across all segments
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relationshipStats.map((stat) => (
          <div key={stat.label} className="surface-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="metric-label">{stat.label}</span>
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                stat.color === "healthy" && "bg-healthy-muted text-healthy",
                stat.color === "informational" && "bg-informational-muted text-informational",
                stat.color === "attention" && "bg-attention-muted text-attention"
              )}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="metric-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Accounts Table */}
      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="section-title">Recent Accounts</h3>
          <button className="text-xs font-medium text-accent hover:underline">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground pb-3">Account Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-3">Assets</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-3">Primary Contact</th>
              </tr>
            </thead>
            <tbody>
              {recentAccounts.map((account, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{account.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-sm text-muted-foreground">{account.type}</td>
                  <td className="py-3.5 text-sm font-medium text-foreground">{account.assets}</td>
                  <td className="py-3.5">
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      account.status === "Active" && "badge-healthy",
                      account.status === "Onboarding" && "badge-info",
                      account.status === "Under Review" && "badge-attention"
                    )}>
                      {account.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-sm text-muted-foreground">{account.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
