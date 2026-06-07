import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-D_vfBtzt.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { H as Heart, L as LayoutDashboard, a as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
function AuthLayout() {
  const navigate = useNavigate();
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  const [user, setUser] = reactExports.useState(null);
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (!data.session) {
        navigate({
          to: "/auth",
          replace: true
        });
      } else {
        setUser(data.session.user);
        setReady(true);
      }
    });
  }, [navigate]);
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({
      to: "/auth",
      replace: true
    });
  };
  if (!ready || !user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "size-5 text-primary fill-current" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: "TDC Matchmakers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden sm:flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${path.startsWith("/dashboard") || path.startsWith("/customers") ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-4" }),
        " Dashboard"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-sm text-muted-foreground", children: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: signOut, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline ml-1.5", children: "Sign out" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  AuthLayout as component
};
