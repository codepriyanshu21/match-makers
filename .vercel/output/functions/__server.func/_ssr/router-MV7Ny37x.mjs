import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-D_vfBtzt.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-C5KvTdVX.css";
function reportAppError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__appEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "This page could not be found." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TDC Matchmaker Dashboard" },
      { name: "description", content: "Internal tool for TDC matchmakers to manage clients, view profiles, and assign AI-ranked matches." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        router2.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      }
    });
    return () => subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
const $$splitComponentImporter$4 = () => import("./auth-BBAXgyqV.mjs");
const Route$4 = createFileRoute("/auth")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./route-BrPyHntr.mjs");
const Route$3 = createFileRoute("/_authenticated")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-B6kw87mK.mjs");
const Route$2 = createFileRoute("/")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard-CV83GoI9.mjs");
const Route$1 = createFileRoute("/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const MALE_FIRST = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Krishna", "Ishaan", "Rohan", "Karan", "Rahul", "Rajat", "Aniket", "Dev", "Kabir", "Yash", "Nikhil", "Siddharth", "Aman", "Manish", "Pranav", "Tarun", "Varun", "Harsh", "Akash", "Raj", "Sameer", "Tushar", "Mihir"];
const FEMALE_FIRST = ["Aanya", "Diya", "Saanvi", "Aadhya", "Myra", "Anika", "Pari", "Riya", "Anaya", "Kiara", "Ananya", "Ishita", "Meera", "Priya", "Neha", "Pooja", "Sneha", "Shruti", "Kavya", "Tanvi", "Aditi", "Sakshi", "Ritika", "Nisha", "Megha", "Divya", "Swati", "Payal", "Anjali", "Sonal"];
const LAST = ["Sharma", "Verma", "Iyer", "Reddy", "Kapoor", "Khanna", "Mehta", "Patel", "Gupta", "Singh", "Nair", "Menon", "Pillai", "Joshi", "Bhatia", "Chopra", "Malhotra", "Agarwal", "Bose", "Das", "Ghosh", "Mukherjee", "Rao", "Krishnan", "Subramanian"];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "Jaipur"];
const COLLEGES = ["IIT Bombay", "IIT Delhi", "IIM Ahmedabad", "BITS Pilani", "Delhi University", "NIT Trichy", "St. Xavier's Mumbai", "VIT Vellore", "Symbiosis Pune", "Christ University"];
const DEGREES = ["B.Tech Computer Science", "MBA Finance", "B.Com Honors", "M.Tech AI", "MBBS", "B.Arch", "B.Des", "CA", "M.A. Economics", "LLB"];
const COMPANIES = ["Google", "Microsoft", "Goldman Sachs", "TCS", "Infosys", "Flipkart", "Zomato", "Razorpay", "McKinsey", "Deloitte", "Swiggy", "PhonePe", "Adobe"];
const DESIGNATIONS = ["Software Engineer", "Product Manager", "Data Scientist", "Consultant", "Designer", "Marketing Manager", "Architect", "Doctor", "Lawyer", "Investment Banker"];
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Jain"];
const CASTES = ["Brahmin", "Kshatriya", "Vaishya", "Khatri", "Agarwal", "Iyer", "Iyengar", "Reddy", "Nair", "Maratha", "Open"];
const LANGS = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Punjabi", "Kannada", "Malayalam"];
const HOBBIES = ["Travel", "Reading", "Cooking", "Yoga", "Photography", "Hiking", "Music", "Painting", "Dancing", "Fitness", "Gaming", "Writing"];
const STATUSES = ["New", "Active", "Match Sent", "On Hold"];
function mulberry32(seed) {
  return function() {
    seed |= 0;
    seed = seed + 1831565813 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}
function pickN(rng, arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  }
  return out;
}
function makeProfile(idx, gender, isCustomer) {
  const rng = mulberry32((isCustomer ? 1e3 : 5e3) + idx);
  const firstNames = gender === "Male" ? MALE_FIRST : FEMALE_FIRST;
  const firstName = pick(rng, firstNames);
  const lastName = pick(rng, LAST);
  const age = 24 + Math.floor(rng() * 14);
  const year = (/* @__PURE__ */ new Date()).getFullYear() - age;
  const month = 1 + Math.floor(rng() * 12);
  const day = 1 + Math.floor(rng() * 28);
  const heightBase = gender === "Male" ? 165 : 150;
  const height = heightBase + Math.floor(rng() * 25);
  const income = 8 + Math.floor(rng() * 60);
  const triOpts = ["Yes", "No", "Maybe"];
  const id = `${isCustomer ? "c" : "p"}${idx}`;
  return {
    id,
    firstName,
    lastName,
    gender,
    dob: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    age,
    country: "India",
    city: pick(rng, CITIES),
    height,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${idx}@example.com`,
    phone: `+91 9${Math.floor(rng() * 9e8 + 1e8)}`,
    college: pick(rng, COLLEGES),
    degree: pick(rng, DEGREES),
    income,
    company: pick(rng, COMPANIES),
    designation: pick(rng, DESIGNATIONS),
    maritalStatus: rng() < 0.85 ? "Never Married" : rng() < 0.5 ? "Divorced" : "Widowed",
    languages: pickN(rng, LANGS, 2 + Math.floor(rng() * 2)),
    siblings: Math.floor(rng() * 4),
    caste: pick(rng, CASTES),
    religion: pick(rng, RELIGIONS),
    motherTongue: pick(rng, LANGS),
    diet: pick(rng, ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"]),
    drinks: pick(rng, ["Never", "Socially", "Often"]),
    smokes: pick(rng, ["Never", "Socially", "Often"]),
    wantKids: pick(rng, triOpts),
    openToRelocate: pick(rng, triOpts),
    openToPets: pick(rng, triOpts),
    hobbies: pickN(rng, HOBBIES, 3),
    about: `${firstName} is a ${pick(rng, ["thoughtful", "ambitious", "warm", "curious", "grounded"])} ${pick(rng, DESIGNATIONS).toLowerCase()} based in ${pick(rng, CITIES)} who values family, growth, and shared adventures.`,
    status: isCustomer ? pick(rng, STATUSES) : void 0
  };
}
const CUSTOMERS = Array.from(
  { length: 12 },
  (_, i) => makeProfile(i, i % 2 === 0 ? "Male" : "Female", true)
);
const DUMMY_PROFILES = [
  ...Array.from({ length: 60 }, (_, i) => makeProfile(i, "Female", false)),
  ...Array.from({ length: 60 }, (_, i) => makeProfile(i + 60, "Male", false))
];
function getCustomer(id) {
  return CUSTOMERS.find((c) => c.id === id);
}
function getProfile(id) {
  return DUMMY_PROFILES.find((p) => p.id === id) ?? getCustomer(id);
}
const $$splitNotFoundComponentImporter = () => import("./customers._id-DR4IOqcX.mjs");
const $$splitComponentImporter = () => import("./customers._id-7lxsJy1w.mjs");
const Route = createFileRoute("/_authenticated/customers/$id")({
  loader: ({
    params
  }) => {
    const customer = getCustomer(params.id);
    if (!customer) throw notFound();
    return {
      customer
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const AuthRoute = Route$4.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$5
});
const AuthenticatedRouteRoute = Route$3.update({
  id: "/_authenticated",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const AuthenticatedDashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCustomersIdRoute = Route.update({
  id: "/customers/$id",
  path: "/customers/$id",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedDashboardRoute,
  AuthenticatedCustomersIdRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CUSTOMERS as C,
  DUMMY_PROFILES as D,
  Route as R,
  getProfile as g,
  router as r
};
