import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CUSTOMERS } from "./router-Ci47zg1v.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import "../_libs/sonner.mjs";
import { b as Search, U as Users, C as ChevronRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-D_vfBtzt.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
const statusColor = {
  New: "bg-blue-100 text-blue-800 border-blue-200",
  Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Match Sent": "bg-amber-100 text-amber-800 border-amber-200",
  "On Hold": "bg-zinc-200 text-zinc-700 border-zinc-300",
  Engaged: "bg-rose-100 text-rose-800 border-rose-200"
};
function Dashboard() {
  const [q, setQ] = reactExports.useState("");
  const [genderFilter, setGenderFilter] = reactExports.useState("All");
  const filtered = reactExports.useMemo(() => {
    return CUSTOMERS.filter((c) => {
      if (genderFilter !== "All" && c.gender !== genderFilter) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return c.firstName.toLowerCase().includes(s) || c.lastName.toLowerCase().includes(s) || c.city.toLowerCase().includes(s);
    });
  }, [q, genderFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Your clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          CUSTOMERS.length,
          " active profiles · curated for thoughtful matchmaking"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 bg-card rounded-xl border border-border/60 p-1 shadow-sm w-full md:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "border-0 pl-9 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent", placeholder: "Search by name or city…", value: q, onChange: (e) => setQ(e.target.value) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["All", "Male", "Female"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setGenderFilter(g), className: `px-4 py-1.5 rounded-full text-sm font-medium border transition ${genderFilter === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`, children: g }, g)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 rounded-xl border border-dashed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-8 mx-auto text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "No clients match your filters." })
      ] }),
      filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/customers/$id", params: {
        id: c.id
      }, className: "group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition hover:shadow-md hover:border-primary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/20 font-display text-lg text-primary", children: [
          c.firstName[0],
          c.lastName[0]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg leading-none", children: [
              c.firstName,
              " ",
              c.lastName
            ] }),
            c.status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: statusColor[c.status] ?? "", children: c.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            c.age,
            " · ",
            c.gender,
            " · ",
            c.city,
            " · ",
            c.maritalStatus
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" })
      ] }, c.id))
    ] })
  ] });
}
export {
  Dashboard as component
};
