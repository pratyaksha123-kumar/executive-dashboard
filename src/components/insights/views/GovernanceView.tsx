import { ShieldCheck, AlertTriangle, CheckCircle, Clock, FileWarning, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const complianceStats = [
  { label: "Compliance Score", value: "94%", icon: ShieldCheck, color: "healthy" },
  { label: "Open Issues", value: "7", icon: AlertTriangle, color: "attention" },
  { label: "Resolved This Month", value: "23", icon: CheckCircle, color: "healthy" },
  { label: "Pending Audits", value: "3", icon: Clock, color: "informational" },
];

const complianceItems = [
  { title: "Form ADV Annual Update", status: "Due Soon", dueDate: "Jan 3, 2025", priority: "High", type: "Regulatory" },
  { title: "AML Review - Q4", status: "In Progress", dueDate: "Jan 15, 2025", priority: "Medium", type: "Internal" },
  { title: "Best Execution Report", status: "Completed", dueDate: "Dec 20, 2024", priority: "Low", type: "Regulatory" },
  { title: "Cybersecurity Assessment", status: "Pending", dueDate: "Jan 30, 2025", priority: "High", type: "Internal" },
  { title: "Client Suitability Reviews", status: "In Progress", dueDate: "Jan 10, 2025", priority: "Medium", type: "Regulatory" },
];

const policyUpdates = [
  { name: "Investment Policy Statement", lastUpdated: "Dec 15, 2024", status: "Current" },
  { name: "Code of Ethics", lastUpdated: "Nov 28, 2024", status: "Current" },
  { name: "Privacy Policy", lastUpdated: "Oct 12, 2024", status: "Review Needed" },
  { name: "Business Continuity Plan", lastUpdated: "Sep 5, 2024", status: "Update Required" },
];

export function GovernanceView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-1">Governance & Compliance</h2>
        <p className="text-sm text-muted-foreground">
          Monitor regulatory compliance, policy adherence, and governance metrics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {complianceStats.map((stat) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Compliance Tasks */}
        <div className="surface-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">Compliance Tasks</h3>
            <button className="text-xs font-medium text-accent hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {complianceItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  item.status === "Completed" && "bg-healthy-muted text-healthy",
                  item.status === "In Progress" && "bg-informational-muted text-informational",
                  item.status === "Due Soon" && "bg-attention-muted text-attention",
                  item.status === "Pending" && "bg-secondary text-muted-foreground"
                )}>
                  {item.status === "Completed" ? <CheckCircle className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.type} • Due: {item.dueDate}</p>
                </div>
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  item.priority === "High" && "badge-critical",
                  item.priority === "Medium" && "badge-attention",
                  item.priority === "Low" && "badge-healthy"
                )}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Updates */}
        <div className="surface-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">Policy Status</h3>
            <button className="text-xs font-medium text-accent hover:underline">Manage Policies</button>
          </div>
          <div className="space-y-3">
            {policyUpdates.map((policy, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileWarning className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{policy.name}</p>
                  <p className="text-xs text-muted-foreground">Updated: {policy.lastUpdated}</p>
                </div>
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  policy.status === "Current" && "badge-healthy",
                  policy.status === "Review Needed" && "badge-attention",
                  policy.status === "Update Required" && "badge-critical"
                )}>
                  {policy.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
