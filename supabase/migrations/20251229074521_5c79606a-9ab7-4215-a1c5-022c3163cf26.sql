-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'attention', 'informational')),
  icon_name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (notifications are system-wide)
CREATE POLICY "Notifications are viewable by everyone" 
ON public.notifications 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to manage notifications
CREATE POLICY "Authenticated users can manage notifications" 
ON public.notifications 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Insert initial notifications data
INSERT INTO public.notifications (label, count, severity, icon_name, description) VALUES
  ('High Priority Signals', 3, 'critical', 'AlertTriangle', 'Urgent items requiring immediate executive attention'),
  ('Policy Exceptions', 7, 'attention', 'Shield', 'Compliance policy deviations flagged for review'),
  ('Pending Actions', 15, 'attention', 'ClipboardList', 'Tasks awaiting completion or approval'),
  ('Validation Flags', 11, 'informational', 'Database', 'Data quality issues identified for correction'),
  ('Connectivity Alerts', 2, 'attention', 'Unplug', 'Integration or API connection issues detected');