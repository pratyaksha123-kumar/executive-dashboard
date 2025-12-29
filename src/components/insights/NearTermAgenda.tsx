import { CalendarDays, Users, FileCheck, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AgendaEvent {
  title: string;
  subtitle: string;
  timing: string;
  category: "leadership" | "regulatory" | "strategy" | "opportunity";
  icon: React.ReactNode;
  details: string;
}

const agendaEvents: AgendaEvent[] = [
  {
    title: "Leadership Reviews",
    subtitle: "6 executive sessions scheduled",
    timing: "This week",
    category: "leadership",
    icon: <Users className="w-4 h-4" />,
    details: "Senior leadership portfolio and performance review sessions"
  },
  {
    title: "Regulatory Due Items",
    subtitle: "Annual filing deadline",
    timing: "Fri, Jan 3",
    category: "regulatory",
    icon: <FileCheck className="w-4 h-4" />,
    details: "Required regulatory submissions and documentation"
  },
  {
    title: "Strategy Presentation",
    subtitle: "2025 roadmap review",
    timing: "Thu, 3:00 PM",
    category: "strategy",
    icon: <CalendarDays className="w-4 h-4" />,
    details: "Annual strategic planning presentation to stakeholders"
  },
  {
    title: "High-Value Opportunities",
    subtitle: "4 prospect meetings",
    timing: "Various",
    category: "opportunity",
    icon: <TrendingUp className="w-4 h-4" />,
    details: "Potential new relationships totaling $62M in projected assets"
  },
];

const categoryColors = {
  leadership: "informational",
  regulatory: "attention",
  strategy: "healthy",
  opportunity: "healthy"
} as const;

export function NearTermAgenda() {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="section-title">Near-Term Agenda</h3>
        <button className="text-xs font-medium text-accent hover:underline">Full Calendar</button>
      </div>
      
      <div className="space-y-2.5">
        {agendaEvents.map((event, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-4 p-3.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors cursor-pointer group">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  categoryColors[event.category] === "informational" && "bg-informational-muted text-informational",
                  categoryColors[event.category] === "attention" && "bg-attention-muted text-attention",
                  categoryColors[event.category] === "healthy" && "bg-healthy-muted text-healthy"
                )}>
                  {event.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{event.subtitle}</p>
                </div>
                
                <div className="text-right flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{event.timing}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[220px]">
              <div>
                <p className="font-medium text-xs">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{event.details}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
