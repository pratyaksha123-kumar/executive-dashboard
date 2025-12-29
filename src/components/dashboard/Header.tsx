import { MessageSquare, Bell, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  active?: boolean;
}

const tabs: Tab[] = [
  { label: "Overview", active: true },
  { label: "Performance" },
  { label: "Clients" },
  { label: "Operations" },
  { label: "Compliance" },
];

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Left side - Title & Tabs */}
      <div className="flex items-center gap-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Executive Dashboard</h1>
        </div>
        
        {/* Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                tab.active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
        </button>

        {/* Chat with AI */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-info text-info-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Chat with AI</span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Sarah Mitchell</p>
            <p className="text-xs text-muted-foreground">Chief Executive</p>
          </div>
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-foreground">SM</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
