import { FileText, FolderOpen, Upload, Download, Clock, CheckCircle, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";

const documentStats = [
  { label: "Total Documents", value: "12,847", icon: FileText, color: "informational" },
  { label: "Pending Review", value: "89", icon: Clock, color: "attention" },
  { label: "Approved Today", value: "34", icon: CheckCircle, color: "healthy" },
  { label: "Expiring Soon", value: "12", icon: FileWarning, color: "critical" },
];

const recentDocuments = [
  { name: "Q4 Performance Report", type: "Report", status: "Approved", date: "Dec 28, 2024", size: "2.4 MB" },
  { name: "Client Agreement - Chen Trust", type: "Agreement", status: "Pending", date: "Dec 27, 2024", size: "1.1 MB" },
  { name: "Compliance Audit Results", type: "Audit", status: "Approved", date: "Dec 26, 2024", size: "4.8 MB" },
  { name: "Investment Policy Statement", type: "Policy", status: "Draft", date: "Dec 25, 2024", size: "890 KB" },
  { name: "Annual Review Presentation", type: "Presentation", status: "Approved", date: "Dec 24, 2024", size: "12.3 MB" },
];

const folders = [
  { name: "Client Agreements", count: 2341, icon: FolderOpen },
  { name: "Compliance Documents", count: 892, icon: FolderOpen },
  { name: "Performance Reports", count: 1567, icon: FolderOpen },
  { name: "Policy Documents", count: 234, icon: FolderOpen },
];

export function DocumentsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight mb-1">Document Center</h2>
          <p className="text-sm text-muted-foreground">
            Manage, review, and organize all firm documents
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {documentStats.map((stat) => (
          <div key={stat.label} className="surface-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="metric-label">{stat.label}</span>
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                stat.color === "healthy" && "bg-healthy-muted text-healthy",
                stat.color === "informational" && "bg-informational-muted text-informational",
                stat.color === "attention" && "bg-attention-muted text-attention",
                stat.color === "critical" && "bg-critical-muted text-critical"
              )}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="metric-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Documents */}
        <div className="lg:col-span-2 surface-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">Recent Documents</h3>
            <button className="text-xs font-medium text-accent hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentDocuments.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-informational-muted flex items-center justify-center">
                  <FileText className="w-5 h-5 text-informational" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    doc.status === "Approved" && "badge-healthy",
                    doc.status === "Pending" && "badge-attention",
                    doc.status === "Draft" && "bg-secondary text-muted-foreground"
                  )}>
                    {doc.status}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1">{doc.date}</p>
                </div>
                <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Folders */}
        <div className="surface-card p-6">
          <h3 className="section-title mb-5">Document Folders</h3>
          <div className="space-y-2">
            {folders.map((folder, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                <folder.icon className="w-5 h-5 text-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{folder.name}</p>
                  <p className="text-xs text-muted-foreground">{folder.count.toLocaleString()} files</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
