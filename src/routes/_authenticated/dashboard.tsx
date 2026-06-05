import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ChevronRight, Users } from "lucide-react";
import { CUSTOMERS } from "@/data/profiles";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const statusColor: Record<string, string> = {
  New: "bg-blue-100 text-blue-800 border-blue-200",
  Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Match Sent": "bg-amber-100 text-amber-800 border-amber-200",
  "On Hold": "bg-zinc-200 text-zinc-700 border-zinc-300",
  Engaged: "bg-rose-100 text-rose-800 border-rose-200",
};

function Dashboard() {
  const [q, setQ] = useState("");
  const [genderFilter, setGenderFilter] = useState<"All" | "Male" | "Female">("All");

  const filtered = useMemo(() => {
    return CUSTOMERS.filter((c) => {
      if (genderFilter !== "All" && c.gender !== genderFilter) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return (
        c.firstName.toLowerCase().includes(s) ||
        c.lastName.toLowerCase().includes(s) ||
        c.city.toLowerCase().includes(s)
      );
    });
  }, [q, genderFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Your clients</h1>
          <p className="text-muted-foreground mt-1">{CUSTOMERS.length} active profiles · curated for thoughtful matchmaking</p>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-xl border border-border/60 p-1 shadow-sm w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              className="border-0 pl-9 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              placeholder="Search by name or city…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {(["All", "Male", "Female"] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGenderFilter(g)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${genderFilter === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 rounded-xl border border-dashed">
            <Users className="size-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">No clients match your filters.</p>
          </div>
        )}
        {filtered.map((c) => (
          <Link
            key={c.id}
            to="/customers/$id"
            params={{ id: c.id }}
            className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition hover:shadow-md hover:border-primary/30"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/20 font-display text-lg text-primary">
              {c.firstName[0]}{c.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-lg leading-none">{c.firstName} {c.lastName}</h3>
                {c.status && (
                  <Badge variant="outline" className={statusColor[c.status] ?? ""}>{c.status}</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {c.age} · {c.gender} · {c.city} · {c.maritalStatus}
              </p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
