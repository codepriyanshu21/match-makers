import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Heart, LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth", replace: true });
      } else {
        setUser(data.session.user);
        setReady(true);
      }
    });
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (!ready || !user) return null;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Heart className="size-5 text-primary fill-current" />
            <span className="font-display text-lg">TDC Matchmakers</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link to="/dashboard" className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${path.startsWith("/dashboard") || path.startsWith("/customers") ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <LayoutDashboard className="size-4" /> Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="size-4" />
              <span className="hidden sm:inline ml-1.5">Sign out</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
