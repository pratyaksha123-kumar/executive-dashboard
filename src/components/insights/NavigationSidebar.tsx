import { 
  LayoutGrid, 
  Users2, 
  UserPlus,
  BarChart3, 
  AlertTriangle,
  ShieldCheck,
  FileBarChart,
  Bot,
  Settings2, 
  LifeBuoy,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NavigationView = "overview" | "clients" | "onboarding" | "analytics" | "alerts" | "compliance" | "reports" | "assistant";

interface NavigationItem {
  id: NavigationView;
  icon: React.ElementType;
  label: string;
  notifications?: number;
}

interface SecondaryNavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const primaryNav: NavigationItem[] = [
  { id: "overview", icon: LayoutGrid, label: "Executive Overview" },
  { id: "clients", icon: Users2, label: "Client Management" },
  { id: "onboarding", icon: UserPlus, label: "Client Onboarding" },
  { id: "analytics", icon: BarChart3, label: "Employee Analytics" },
  { id: "alerts", icon: AlertTriangle, label: "Alerts Center" },
  { id: "compliance", icon: ShieldCheck, label: "Compliance Monitor" },
  { id: "reports", icon: FileBarChart, label: "Reports & Analytics" },
  { id: "assistant", icon: Bot, label: "AI Assistant" },
];

const secondaryNav: SecondaryNavItem[] = [
  { id: "preferences", icon: Settings2, label: "Preferences" },
  { id: "assistance", icon: LifeBuoy, label: "Assistance" },
];

interface NavigationSidebarProps {
  activeView: NavigationView;
  onNavigate: (view: NavigationView) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function NavigationSidebar({ 
  activeView, 
  onNavigate, 
  isCollapsed, 
  onToggleCollapse 
}: NavigationSidebarProps) {
  return (
    <nav 
      className={cn(
        "fixed left-0 top-0 h-screen bg-nav flex flex-col transition-all duration-300 z-50",
        isCollapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-nav-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-accent-foreground" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in overflow-hidden">
              <p className="text-sidebar-primary font-semibold text-sm truncate">Pinnacle</p>
              <p className="text-sidebar-foreground text-[10px] opacity-60 truncate">Advisory Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        {primaryNav.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "nav-item w-full",
                isActive ? "nav-item-active" : "nav-item-inactive"
              )}
            >
              <item.icon className={cn(
                "w-[18px] h-[18px] flex-shrink-0",
                isActive && "text-accent"
              )} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.notifications && (
                    <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold flex items-center justify-center">
                      {item.notifications}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Navigation */}
      <div className="py-4 px-3 border-t border-nav-border space-y-1">
        {secondaryNav.map((item) => (
          <button
            key={item.id}
            className="nav-item nav-item-inactive w-full"
          >
            <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-secondary transition-colors"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft className={cn(
          "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
          isCollapsed && "rotate-180"
        )} />
      </button>
    </nav>
  );
}
