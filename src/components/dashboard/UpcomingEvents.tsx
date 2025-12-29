import { Calendar, Users, FileText, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Event {
  title: string;
  subtitle: string;
  time: string;
  type: "review" | "compliance" | "presentation" | "prospect";
  icon: React.ReactNode;
  details: string;
}

const events: Event[] = [
  {
    title: "Client Reviews Scheduled",
    subtitle: "8 quarterly reviews this week",
    time: "Throughout week",
    type: "review",
    icon: <Users className="w-4 h-4" />,
    details: "Quarterly portfolio reviews with high-net-worth clients"
  },
  {
    title: "Compliance Deadlines",
    subtitle: "Form ADV annual amendment",
    time: "Wed, Dec 31",
    type: "compliance",
    icon: <FileText className="w-4 h-4" />,
    details: "Annual regulatory filing deadline - ensure all documents are submitted"
  },
  {
    title: "Board Presentation",
    subtitle: "Q4 performance review",
    time: "Thu, 2:00 PM",
    type: "presentation",
    icon: <Calendar className="w-4 h-4" />,
    details: "Executive presentation covering Q4 results and 2025 outlook"
  },
  {
    title: "High-Value Prospects",
    subtitle: "3 meetings scheduled",
    time: "Fri, Various",
    type: "prospect",
    icon: <TrendingUp className="w-4 h-4" />,
    details: "Potential new clients with combined AUM potential of $45M"
  },
];

const typeColors = {
  review: "info",
  compliance: "warning",
  presentation: "success",
  prospect: "success"
} as const;

export function UpcomingEvents() {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Upcoming This Week</h3>
        <button className="text-xs font-medium text-info hover:underline">View Calendar</button>
      </div>
      
      <div className="space-y-3">
        {events.map((event, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div 
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  typeColors[event.type] === "info" && "bg-info-muted text-info",
                  typeColors[event.type] === "warning" && "bg-warning-muted text-warning",
                  typeColors[event.type] === "success" && "bg-success-muted text-success"
                )}>
                  {event.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{event.subtitle}</p>
                </div>
                
                <div className="text-right flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{event.time}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{event.details}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
