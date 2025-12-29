import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileSearch,
  Mail
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const complianceMetrics = [
  { label: "Overall Compliance Score", value: "94.2%", change: "+1.7%", icon: ShieldCheck, color: "text-healthy" },
  { label: "Open Issues", value: "7", sublabel: "3 High Priority", icon: AlertTriangle, color: "text-attention" },
  { label: "Documents Reviewed", value: "2,847", sublabel: "This Month", icon: FileText, color: "text-informational" },
  { label: "Next Audit", value: "45", sublabel: "Days Remaining", icon: Calendar, color: "text-primary" },
];

const regulatoryStatus = [
  { rule: "SEC Rule 206(4)-7", description: "Compliance Policies & Procedures", status: "compliant", lastReview: "12 days ago" },
  { rule: "FINRA Rule 3110", description: "Supervision Requirements", status: "needs-review", dueDate: "Due 5 days" },
  { rule: "Form ADV Updates", description: "Annual Amendment Filing", status: "filed", lastReview: "30 days ago" },
  { rule: "Client Privacy Notice", description: "Regulation S-P Requirements", status: "overdue", dueDate: "Due 3 days ago" },
  { rule: "Anti-Money Laundering", description: "AML Program Compliance", status: "up-to-date", lastReview: "7 days ago" },
];

const riskIssues = [
  { title: "Missing KYC Documentation", severity: "high", description: "7 clients with incomplete KYC documentation requiring immediate attention", assignee: "Sarah Mitchell" },
  { title: "Supervision Documentation", severity: "medium", description: "Quarterly supervision reviews need completion for 3 advisors", dueDate: "Due March 31, 2024" },
  { title: "Communication Surveillance", severity: "medium", description: "12 flagged communications require review and approval", assignee: "Compliance Team" },
  { title: "Trade Authorization Forms", severity: "low", description: "5 clients need updated trade authorization forms", dueDate: "Due April 15, 2024" },
];

const documentStatus = [
  { name: "KYC Documents", percentage: 87 },
  { name: "Risk Assessments", percentage: 73 },
  { name: "Disclosures", percentage: 95 },
  { name: "Service Agreements", percentage: 91 },
];

const communicationStats = [
  { label: "Emails Reviewed", value: "847", period: "Today" },
  { label: "Flagged Communications", value: "12", period: "Pending Review" },
  { label: "Policy Violations", value: "2", period: "This Month" },
  { label: "Compliance Rate", value: "98.7%", period: "Overall" },
];

const auditActivity = [
  { action: "Form ADV Part 2 Updated", timestamp: "2 hours ago", icon: FileText },
  { action: "Client File Review Completed", client: "Johnson Family Office", timestamp: "5 hours ago", icon: CheckCircle2 },
  { action: "KYC Documentation Flagged", client: "Westbrook Trust", timestamp: "1 day ago", icon: AlertCircle },
  { action: "Supervision Report Filed", period: "Q1 2024 Review", timestamp: "2 days ago", icon: FileSearch },
  { action: "Policy Violation Detected", client: "Internal Communication", timestamp: "3 days ago", icon: XCircle },
];

export function ComplianceMonitorView() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge variant="outline" className="border-healthy text-healthy bg-healthy/10">Compliant</Badge>;
      case "up-to-date":
        return <Badge variant="outline" className="border-healthy text-healthy bg-healthy/10">Up to Date</Badge>;
      case "filed":
        return <Badge variant="outline" className="border-informational text-informational bg-informational/10">Filed</Badge>;
      case "needs-review":
        return <Badge variant="outline" className="border-attention text-attention bg-attention/10">Needs Review</Badge>;
      case "overdue":
        return <Badge variant="outline" className="border-critical text-critical bg-critical/10">Overdue</Badge>;
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-critical text-critical-foreground">High Risk</Badge>;
      case "medium":
        return <Badge className="bg-attention text-attention-foreground">Medium Risk</Badge>;
      case "low":
        return <Badge className="bg-informational text-informational-foreground">Low Risk</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Compliance Monitor</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Regulatory compliance tracking, documentation management, and audit trail maintenance
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
          <FileText className="w-4 h-4" />
          Generate Compliance Report
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceMetrics.map((metric) => (
          <Card key={metric.label} className="bg-card border-border">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{metric.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                    {metric.change && <span className="text-xs text-healthy">{metric.change}</span>}
                  </div>
                  {metric.sublabel && <p className="text-xs text-muted-foreground mt-0.5">{metric.sublabel}</p>}
                </div>
                <div className={cn("p-2 rounded-lg bg-secondary", metric.color)}>
                  <metric.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Regulatory Compliance Status */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Regulatory Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regulatoryStatus.map((item) => (
                <div key={item.rule} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.rule}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <span className="text-xs text-muted-foreground">
                      {item.lastReview || item.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment & Open Issues */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Risk Assessment & Open Issues</CardTitle>
              <select className="text-xs bg-secondary border border-border rounded px-2 py-1 text-muted-foreground">
                <option>All Risk Levels</option>
                <option>High Risk</option>
                <option>Medium Risk</option>
                <option>Low Risk</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskIssues.map((issue, index) => (
                <div key={index} className={cn(
                  "p-3 rounded-lg border-l-4",
                  issue.severity === "high" ? "border-l-critical bg-critical/5" :
                  issue.severity === "medium" ? "border-l-attention bg-attention/5" :
                  "border-l-informational bg-informational/5"
                )}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">{issue.title}</p>
                    {getSeverityBadge(issue.severity)}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{issue.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {issue.assignee ? `Assigned: ${issue.assignee}` : issue.dueDate}
                    </span>
                    <button className="text-xs text-primary hover:underline">Review →</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Documentation Status */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Documentation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentStatus.map((doc) => (
                <div key={doc.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-foreground">{doc.name}</span>
                    <span className="text-sm font-medium text-foreground">{doc.percentage}%</span>
                  </div>
                  <Progress 
                    value={doc.percentage} 
                    className={cn(
                      "h-2",
                      doc.percentage >= 90 ? "[&>div]:bg-healthy" :
                      doc.percentage >= 70 ? "[&>div]:bg-attention" : "[&>div]:bg-critical"
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communication Surveillance */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Communication Surveillance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {communicationStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm text-foreground">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.period}</p>
                  </div>
                  <span className="text-lg font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Audit Activity */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Audit Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-secondary flex-shrink-0">
                    <activity.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">{activity.action}</p>
                    {activity.client && <p className="text-xs text-muted-foreground">{activity.client}</p>}
                    {activity.period && <p className="text-xs text-muted-foreground">{activity.period}</p>}
                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Compliance Agent */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">Robert - Compliance Agent</h4>
                <Badge variant="secondary" className="text-[10px]">AI Assistant for Risk & Compliance</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Recent Analysis</p>
                  <p className="text-sm text-foreground">Found pattern: 3 KYC rejections this week from the same custodian. Recommend process review.</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">Weekly Review</button>
                    <button className="px-3 py-1 bg-secondary text-foreground rounded text-xs">Schedule Later</button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Suggested Actions</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-muted-foreground" />Update 5 client risk profiles due this week</li>
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-muted-foreground" />Review flagged email communications</li>
                    <li className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-muted-foreground" />Prepare for upcoming FINRA examination</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Quick Links</p>
                  <ul className="text-sm text-primary space-y-1">
                    <li className="hover:underline cursor-pointer">→ Complete quarterly supervision documentation</li>
                    <li className="hover:underline cursor-pointer">→ Review pending compliance tasks</li>
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