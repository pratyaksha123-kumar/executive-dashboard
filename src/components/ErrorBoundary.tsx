import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    // Keep this console output; it helps debug production-only crashes (like Vercel builds)
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] Uncaught error:", error);
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <section className="surface-card p-6 max-w-xl w-full">
          <header className="mb-3">
            <h1 className="text-xl font-semibold text-foreground">App crashed</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Console me exact error details mil jayengi. (Vercel pe production-only crash debug)
            </p>
          </header>

          <div className="rounded-md border border-border bg-secondary/40 p-3">
            <p className="text-xs font-medium text-muted-foreground">Error</p>
            <p className="text-sm text-foreground break-words mt-1">{this.state.message}</p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button onClick={this.handleReload}>Reload</Button>
          </div>
        </section>
      </main>
    );
  }
}
