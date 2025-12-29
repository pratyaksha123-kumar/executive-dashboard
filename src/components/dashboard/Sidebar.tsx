import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  PieChart, 
  Settings, 
  Shield, 
  HelpCircle,
  ChevronLeft,
  Building2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Clients", badge: 3 },
  { icon: Briefcase, label: "Portfolios" },
  { icon: FileText, label: "Reports" },
  { icon: PieChart, label: "Analytics" },
  { icon: Shield, label: "Compliance" },
];

const bottomNavItems: NavItem[] = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Support" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar flex flex-col transition-all duration-300 ease-out z-50",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-sidebar-primary font-semibold text-sm tracking-tight">Meridian Wealth</h1>
              <p className="text-sidebar-foreground text-[10px] opacity-70">Management Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                item.active 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", item.active && "text-info")} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-info text-info-foreground text-[10px] font-semibold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-3 border-t border-sidebar-border">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary transition-all duration-200"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-accent transition-colors"
      >
        <ChevronLeft className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform", collapsed && "rotate-180")} />
      </button>
    </aside>
  );
}
