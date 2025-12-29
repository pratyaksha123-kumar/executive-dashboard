import { useState, useEffect } from "react";
import { Bot, Bell, Search, ChevronDown, X, AlertTriangle, Shield, ClipboardList, Database, Unplug } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationView } from "./NavigationSidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NotificationItem {
  id: string;
  label: string;
  count: number;
  severity: "critical" | "attention" | "informational";
  icon_name: string;
  description: string;
}

const iconMap: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  ClipboardList: <ClipboardList className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Unplug: <Unplug className="w-4 h-4" />,
};

interface TabItem {
  id: NavigationView;
  label: string;
}

const tabs: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "clients", label: "Clients" },
  { id: "onboarding", label: "Onboarding" },
  { id: "analytics", label: "Analytics" },
  { id: "alerts", label: "Alerts" },
  { id: "compliance", label: "Compliance" },
  { id: "reports", label: "Reports" },
  { id: "assistant", label: "AI Assistant" },
];

interface TopHeaderProps {
  activeView: NavigationView;
  onNavigate: (view: NavigationView) => void;
}

export function TopHeader({ activeView, onNavigate }: TopHeaderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const totalNotifications = notifications.reduce((sum, item) => sum + item.count, 0);

  // Fetch notifications from database
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications((data || []) as NotificationItem[]);
      }
      setIsLoading(false);
    };

    fetchNotifications();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          console.log('Realtime notification update:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newNotification = payload.new as NotificationItem;
            setNotifications(prev => [...prev, newNotification]);
            toast({
              title: "New Alert",
              description: newNotification.label,
            });
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as NotificationItem;
            setNotifications(prev => 
              prev.map(n => n.id === updated.id ? updated : n)
            );
          } else if (payload.eventType === 'DELETE') {
            const deleted = payload.old as { id: string };
            setNotifications(prev => prev.filter(n => n.id !== deleted.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const dismissNotification = async (id: string) => {
    // Optimistically update UI
    setNotifications(prev => prev.filter(n => n.id !== id));
    
    // Delete from database
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error dismissing notification:', error);
      // Refetch on error
      const { data } = await supabase.from('notifications').select('*');
      if (data) setNotifications(data as NotificationItem[]);
    }
  };

  const clearAll = async () => {
    setNotifications([]);
    setIsOpen(false);
    
    const { error } = await supabase
      .from('notifications')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left - Page Title & Tabs */}
      <div className="flex items-center gap-10">
        <h1 className="text-lg font-semibold text-foreground">Executive Overview</h1>
        
        {/* Section Tabs */}
        <nav className="hidden xl:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={cn(
                "px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-150",
                activeView === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2.5">
        {/* Search */}
        <button 
          className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/10 transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Notifications */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button 
              className="relative w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-muted-foreground" />
              {totalNotifications > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-critical text-critical-foreground text-[10px] font-semibold flex items-center justify-center">
                  {totalNotifications > 99 ? "99+" : totalNotifications}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-80 p-0 bg-card border border-border shadow-lg z-50" 
            align="end"
            sideOffset={8}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {notifications.length > 0 && (
                <button 
                  onClick={clearAll}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="max-h-[320px] overflow-y-auto">
              {isLoading ? (
                <div className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-start gap-3 p-3 hover:bg-secondary/50 transition-colors group"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5",
                        item.severity === "critical" && "bg-critical text-critical-foreground",
                        item.severity === "attention" && "bg-attention text-attention-foreground",
                        item.severity === "informational" && "bg-informational text-informational-foreground"
                      )}>
                        {iconMap[item.icon_name] || <Bell className="w-4 h-4" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                          <span className={cn(
                            "text-xs font-semibold px-1.5 py-0.5 rounded",
                            item.severity === "critical" && "bg-critical/20 text-critical",
                            item.severity === "attention" && "bg-attention/20 text-attention",
                            item.severity === "informational" && "bg-informational/20 text-informational"
                          )}>
                            {item.count}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => dismissNotification(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary rounded transition-all"
                        aria-label="Dismiss notification"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <button 
                  onClick={() => {
                    onNavigate("alerts");
                    setIsOpen(false);
                  }}
                  className="w-full text-center text-xs font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  View all alerts
                </button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* AI Assistant */}
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors">
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg hover:bg-secondary transition-colors ml-1">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-foreground leading-tight">Alexandra Chen</p>
            <p className="text-[11px] text-muted-foreground">Managing Director</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-foreground">AC</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
