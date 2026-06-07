import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { R as Route, D as DUMMY_PROFILES, g as getProfile } from "./router-Ci47zg1v.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-BwVezT5K.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CM60iMCt.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowLeft, B as Briefcase, G as GraduationCap, M as Mail, P as Phone, c as MapPin, d as Languages, U as Users, e as CircleCheck, S as Sparkles, f as LoaderCircle, g as Send, H as Heart, X } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
function triCompat(a, b) {
  if (a === b) return 1;
  if (a === "Maybe" || b === "Maybe") return 0.6;
  return 0;
}
function rankMatches(customer, pool = DUMMY_PROFILES) {
  const candidates = pool.filter((p) => p.gender !== customer.gender);
  const scored = candidates.map((p) => {
    const reasons = [];
    let score = 0;
    if (customer.gender === "Male") {
      const ageDiff = customer.age - p.age;
      if (ageDiff >= 1 && ageDiff <= 6) {
        score += 18;
        reasons.push(`${ageDiff} year age gap`);
      } else if (ageDiff === 0) {
        score += 8;
      }
      if (p.height < customer.height) {
        score += 10;
        reasons.push("Compatible heights");
      }
      if (p.income < customer.income) {
        score += 8;
      }
    } else {
      const ageDiff = p.age - customer.age;
      if (ageDiff >= 0 && ageDiff <= 5) {
        score += 15;
        reasons.push("Similar life stage");
      }
      if (Math.abs(p.income - customer.income) < 25) {
        score += 10;
        reasons.push("Aligned career trajectory");
      }
      if (p.height >= customer.height) {
        score += 6;
      }
    }
    const wantKids = triCompat(customer.wantKids, p.wantKids);
    score += wantKids * 14;
    if (wantKids === 1) reasons.push("Aligned on kids");
    const relocate = triCompat(customer.openToRelocate, p.openToRelocate);
    score += relocate * 8;
    if (relocate === 1 && customer.city !== p.city) reasons.push("Both open to relocating");
    if (customer.city === p.city) {
      score += 8;
      reasons.push(`Both in ${p.city}`);
    }
    if (customer.religion === p.religion) {
      score += 10;
      reasons.push(`Same religion (${p.religion})`);
    }
    if (customer.diet === p.diet) {
      score += 4;
    }
    if (customer.smokes === "Never" && p.smokes === "Never") {
      score += 3;
    }
    const sharedLangs = customer.languages.filter((l) => p.languages.includes(l));
    if (sharedLangs.length) {
      score += Math.min(6, sharedLangs.length * 3);
      reasons.push(`Speaks ${sharedLangs[0]}`);
    }
    const sharedHobbies = customer.hobbies.filter((h) => p.hobbies.includes(h));
    if (sharedHobbies.length) {
      score += sharedHobbies.length * 3;
      reasons.push(`Shared interest: ${sharedHobbies[0]}`);
    }
    if (p.maritalStatus === customer.maritalStatus) score += 3;
    const normalized = Math.min(100, Math.round(score));
    const tier = normalized >= 70 ? "High Potential" : normalized >= 50 ? "Strong" : "Worth Considering";
    return { profile: p, score: normalized, reasons: reasons.slice(0, 4), tier };
  });
  return scored.sort((a, b) => b.score - a.score);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ProfileSummarySchema = objectType({
  firstName: stringType(),
  lastName: stringType(),
  age: numberType(),
  city: stringType(),
  designation: stringType(),
  company: stringType(),
  religion: stringType(),
  wantKids: stringType(),
  hobbies: arrayType(stringType())
});
const ScoreInput = objectType({
  customer: ProfileSummarySchema,
  match: ProfileSummarySchema,
  ruleScore: numberType(),
  ruleReasons: arrayType(stringType())
});
const aiExplainMatch = createServerFn({
  method: "POST"
}).inputValidator((d) => ScoreInput.parse(d)).handler(createSsrRpc("4b1cadaa8cc04f370a7e54b3ad1022e3d979770e9e6d066bcc105434788723c5"));
const IntroInput = objectType({
  customer: ProfileSummarySchema,
  match: ProfileSummarySchema
});
const aiGenerateIntro = createServerFn({
  method: "POST"
}).inputValidator((d) => IntroInput.parse(d)).handler(createSsrRpc("ff39f42449602efc379b7711cd5e6a3293ea07f34381aa0edb6e724db73b3752"));
const getCustomerData = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  customerId: stringType()
}).parse(d)).handler(createSsrRpc("62f78415c6c889d2d38161536f9a2ca754a196ed26e6d0e6487e94bc9f421dec"));
const addNote = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  customerId: stringType(),
  content: stringType().min(1).max(2e3)
}).parse(d)).handler(createSsrRpc("967941a0ae5a016ebb717ca4c106e39ce8d360ceac72b0e12406259c43aeb63f"));
const recordSentMatch = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  customerId: stringType(),
  matchProfileId: stringType(),
  introEmail: stringType().max(4e3).optional()
}).parse(d)).handler(createSsrRpc("042203c3a15e5594a66eda91ef000dc008647afbf36cd6cf65160ffbe890e02f"));
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function summarize(p) {
  return {
    firstName: p.firstName,
    lastName: p.lastName,
    age: p.age,
    city: p.city,
    designation: p.designation,
    company: p.company,
    religion: p.religion,
    wantKids: p.wantKids,
    hobbies: p.hobbies
  };
}
function CustomerDetail() {
  const {
    customer
  } = Route.useLoaderData();
  const matches = reactExports.useMemo(() => rankMatches(customer).slice(0, 12), [customer]);
  const fetchData = useServerFn(getCustomerData);
  const {
    data,
    refetch
  } = useQuery({
    queryKey: ["customer-data", customer.id],
    queryFn: () => fetchData({
      data: {
        customerId: customer.id
      }
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4 mr-1" }),
      " Back to clients"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/20 font-display text-3xl text-primary", children: [
        customer.firstName[0],
        customer.lastName[0]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl", children: [
          customer.firstName,
          " ",
          customer.lastName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          customer.age,
          " · ",
          customer.gender,
          " · ",
          customer.city,
          ", ",
          customer.country,
          " · ",
          customer.maritalStatus
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-3 mr-1" }),
            customer.designation,
            " · ",
            customer.company
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-3 mr-1" }),
            customer.degree
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
            "₹",
            customer.income,
            " LPA"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "bio", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "bio", children: "Biodata" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "matches", children: "Suggested matches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "notes", children: "Notes & history" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bio", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Biodata, { customer }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "matches", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchesSection, { customer, matches, sentIds: new Set((data?.sentMatches ?? []).map((m) => m.match_profile_id)), onSent: refetch }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notes", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotesSection, { customerId: customer.id, notes: data?.notes ?? [], sentMatches: data?.sentMatches ?? [], onChange: refetch }) })
    ] })
  ] });
}
function Field({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1", children: [
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-3" }),
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-medium break-words max-w-full", children: value })
  ] });
}
function Biodata({
  customer
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Personal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "First Name", value: customer.firstName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Last Name", value: customer.lastName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date of Birth", value: customer.dob }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Gender", value: customer.gender }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Height", value: `${customer.height} cm` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Marital Status", value: customer.maritalStatus }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Siblings", value: customer.siblings })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Contact & Location", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: customer.email, icon: Mail }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", value: customer.phone, icon: Phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country", value: customer.country }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City", value: customer.city, icon: MapPin })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Education & Career", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Undergraduate College", value: customer.college, icon: GraduationCap }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Degree", value: customer.degree }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Current Company", value: customer.company, icon: Briefcase }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Designation", value: customer.designation }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Income", value: `₹${customer.income} LPA` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Religion", value: customer.religion }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Caste / Community", value: customer.caste }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mother Tongue", value: customer.motherTongue }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Languages Known", value: customer.languages.join(", "), icon: Languages })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Lifestyle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Diet", value: customer.diet }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Drinks", value: customer.drinks }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Smokes", value: customer.smokes }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hobbies", value: customer.hobbies.join(", ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Preferences", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Want Kids", value: customer.wantKids }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Open to Relocate", value: customer.openToRelocate }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Open to Pets", value: customer.openToPets })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 rounded-xl border border-border/60 bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-2", children: "About" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: customer.about })
    ] })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3", children })
  ] });
}
function MatchesSection({
  customer,
  matches,
  sentIds,
  onSent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: matches.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { customer, match: m, alreadySent: sentIds.has(m.profile.id), onSent }, m.profile.id)) });
}
const tierStyles = {
  "High Potential": "bg-rose-50 text-rose-800 border-rose-200",
  "Strong": "bg-amber-50 text-amber-800 border-amber-200",
  "Worth Considering": "bg-zinc-100 text-zinc-700 border-zinc-300"
};
function MatchCard({
  customer,
  match,
  alreadySent,
  onSent
}) {
  const p = match.profile;
  const [explanation, setExplanation] = reactExports.useState(null);
  const [emailOpen, setEmailOpen] = reactExports.useState(false);
  const [emailDraft, setEmailDraft] = reactExports.useState(null);
  const explain = useServerFn(aiExplainMatch);
  const intro = useServerFn(aiGenerateIntro);
  const record = useServerFn(recordSentMatch);
  const explainM = useMutation({
    mutationFn: () => explain({
      data: {
        customer: summarize(customer),
        match: summarize(p),
        ruleScore: match.score,
        ruleReasons: match.reasons
      }
    }),
    onSuccess: (r) => setExplanation(r.explanation),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to generate")
  });
  const sendM = useMutation({
    mutationFn: async () => {
      let draft = emailDraft;
      if (!draft) {
        const r = await intro({
          data: {
            customer: summarize(customer),
            match: summarize(p)
          }
        });
        draft = r.email;
        setEmailDraft(draft);
      }
      return draft;
    },
    onSuccess: () => setEmailOpen(true),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to draft email")
  });
  const confirmSendM = useMutation({
    mutationFn: () => record({
      data: {
        customerId: customer.id,
        matchProfileId: p.id,
        introEmail: emailDraft ?? void 0
      }
    }),
    onSuccess: () => {
      toast.success(`Match sent to ${customer.firstName}'s inbox (mock).`);
      setEmailOpen(false);
      onSent();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to send")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5 shadow-sm space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-display text-lg", children: [
            p.firstName,
            " ",
            p.lastName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: tierStyles[match.tier], children: match.tier }),
          alreadySent && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-emerald-50 text-emerald-800 border-emerald-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3 mr-1" }),
            "Sent"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          p.age,
          " · ",
          p.designation,
          " at ",
          p.company,
          " · ",
          p.city
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl text-primary", children: match.score }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "score" })
      ] })
    ] }),
    match.reasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: match.reasons.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full", children: r }, r)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Height: ",
        p.height,
        "cm"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "₹",
        p.income,
        " LPA"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: p.religion }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Kids: ",
        p.wantKids
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Relocate: ",
        p.openToRelocate
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: p.diet })
    ] }),
    explanation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-rose-50/60 border border-rose-200/60 p-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-rose-800 font-medium mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }),
        " AI reasoning"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed", children: explanation })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => explainM.mutate(), disabled: explainM.isPending, children: [
        explainM.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-3.5 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 mr-1" }),
        "Why this match?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => sendM.mutate(), disabled: sendM.isPending, children: [
        sendM.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-3.5 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-3.5 mr-1" }),
        "Send Match"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: emailOpen, onOpenChange: setEmailOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "size-5 text-primary fill-current" }),
          "Introducing ",
          p.firstName,
          " to ",
          customer.firstName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "AI-generated draft — review before sending." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { className: "min-h-[260px] font-mono text-sm", value: emailDraft ?? "", onChange: (e) => setEmailDraft(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/30 p-3 text-xs space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Match profile snapshot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          p.firstName,
          " ",
          p.lastName,
          " · ",
          p.age,
          " · ",
          p.designation,
          " at ",
          p.company
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          p.city,
          " · ",
          p.religion,
          " · ₹",
          p.income,
          " LPA · ",
          p.height,
          "cm"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Hobbies: ",
          p.hobbies.join(", ")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setEmailOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => confirmSendM.mutate(), disabled: confirmSendM.isPending, children: [
          confirmSendM.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4 mr-1" }),
          "Send (mock email)"
        ] })
      ] })
    ] }) })
  ] });
}
function NotesSection({
  customerId,
  notes,
  sentMatches,
  onChange
}) {
  const [draft, setDraft] = reactExports.useState("");
  const add = useServerFn(addNote);
  const qc = useQueryClient();
  const addM = useMutation({
    mutationFn: () => add({
      data: {
        customerId,
        content: draft.trim()
      }
    }),
    onSuccess: () => {
      setDraft("");
      onChange();
      qc.invalidateQueries({
        queryKey: ["customer-data", customerId]
      });
      toast.success("Note added");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to add note")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-3", children: "Quick notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Notes from the last meeting or call…", value: draft, onChange: (e) => setDraft(e.target.value), rows: 3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => addM.mutate(), disabled: !draft.trim() || addM.isPending, children: addM.isPending ? "Saving…" : "Add note" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-5", children: [
        notes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No notes yet." }),
        notes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: new Date(n.created_at).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap", children: n.content })
        ] }, n.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
        " Match history"
      ] }),
      sentMatches.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No matches sent yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sentMatches.map((s) => {
        const p = getProfile(s.match_profile_id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p ? `${p.firstName} ${p.lastName}` : s.match_profile_id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(s.created_at).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-emerald-50 text-emerald-800 border-emerald-200", children: "Sent" })
        ] }, s.id);
      }) })
    ] })
  ] });
}
export {
  CustomerDetail as component
};
