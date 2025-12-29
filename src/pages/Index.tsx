import { useState } from "react";
import { Users2, DollarSign, Briefcase, Info } from "lucide-react";
import { NavigationSidebar, NavigationView } from "@/components/insights/NavigationSidebar";
import { TopHeader } from "@/components/insights/TopHeader";
import { SnapshotCard } from "@/components/insights/SnapshotCard";
import { OperationsPulse } from "@/components/insights/OperationsPulse";
import { PlatformReliability } from "@/components/insights/PlatformReliability";
import { RelationshipHealth } from "@/components/insights/RelationshipHealth";
import { NotificationsPanel } from "@/components/insights/NotificationsPanel";
import { IntegrationStatusBoard } from "@/components/insights/IntegrationStatusBoard";
import { NearTermAgenda } from "@/components/insights/NearTermAgenda";
import { GrowthTrendsChart, AdvisorLeaderboard } from "@/components/insights/GrowthCharts";
import { ClientManagementView } from "@/components/insights/views/ClientManagementView";
import { ClientOnboardingView } from "@/components/insights/views/ClientOnboardingView";
import { EmployeeAnalyticsView } from "@/components/insights/views/EmployeeAnalyticsView";
import { AlertsCenterView } from "@/components/insights/views/AlertsCenterView";
import { ComplianceMonitorView } from "@/components/insights/views/ComplianceMonitorView";
import { ReportsAnalyticsView } from "@/components/insights/views/ReportsAnalyticsView";
import { AIAssistantView } from "@/components/insights/views/AIAssistantView";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeView, setActiveView] = useState<NavigationView>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = (view: NavigationView) => {
    setActiveView(view);
  };

  const renderContent = () => {
    switch (activeView) {
      case "clients":
        return <ClientManagementView />;
      case "onboarding":
        return <ClientOnboardingView />;
      case "analytics":
        return <EmployeeAnalyticsView />;
      case "alerts":
        return <AlertsCenterView />;
      case "compliance":
        return <ComplianceMonitorView />;
      case "reports":
        return <ReportsAnalyticsView />;
      case "assistant":
        return <AIAssistantView />;
      case "overview":
      default:
        return (
          <>
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">Executive Overview</h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[240px]">
                    <p className="text-xs">Real-time metrics refreshed every 5 minutes. Last update: Just now</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-muted-foreground">
                High-level visibility into business growth, operations, and platform health
              </p>
            </div>

            {/* Business Snapshot Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
                <SnapshotCard
                  label="Customer Base Size"
                  value="1,624"
                  change={{ value: "+3.8%", direction: "up" }}
                  detail="vs prior period"
                  icon={<Users2 className="w-5 h-5" />}
                  accentColor="informational"
                  tooltip="Total active client accounts across all segments"
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
                <SnapshotCard
                  label="Assets Under Oversight"
                  value="$8.2B"
                  change={{ value: "+5.2%", direction: "up" }}
                  detail="vs last quarter"
                  icon={<DollarSign className="w-5 h-5" />}
                  accentColor="healthy"
                  tooltip="Total managed assets across all portfolios"
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <SnapshotCard
                  label="Advisory Team Count"
                  value="38"
                  detail="42.7 accounts per advisor"
                  icon={<Briefcase className="w-5 h-5" />}
                  accentColor="default"
                  tooltip="Active advisors and relationship managers"
                />
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
                <GrowthTrendsChart />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <AdvisorLeaderboard />
              </div>
            </div>

            {/* Relationship Health - Full Width */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "250ms" }}>
              <RelationshipHealth />
            </div>

            {/* Operations & Platform Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                <OperationsPulse />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "350ms" }}>
                <PlatformReliability />
              </div>
            </div>

            {/* Notifications & Integrations Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                <NotificationsPanel />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "450ms" }}>
                <IntegrationStatusBoard />
              </div>
            </div>

            {/* Near-Term Agenda */}
            <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
              <NearTermAgenda />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <NavigationSidebar 
        activeView={activeView}
        onNavigate={handleNavigate}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarCollapsed ? "pl-[68px]" : "pl-[240px]"
        )}
      >
        {/* Top Header */}
        <TopHeader 
          activeView={activeView}
          onNavigate={handleNavigate}
        />
        
        {/* Dashboard Content */}
        <main className="p-6 max-w-[1600px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
