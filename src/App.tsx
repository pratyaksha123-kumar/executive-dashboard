import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// ❗ IMPORTANT: Toaster / Sonner ko lazy + safe way me load kar rahe hain
import { Suspense, lazy } from "react";

const Toaster = lazy(() => import("@/components/ui/toaster"));
const Sonner = lazy(() => import("@/components/ui/sonner"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* ✅ SAFE TOASTERS (won't crash production) */}
        <Suspense fallback={null}>
          <Toaster />
          <Sonner />
        </Suspense>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
