import type { ComponentType, ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ArrowLeft, Mail, Phone, MapPin, GraduationCap, Briefcase, Languages, Users,
  Heart, Sparkles, Send, Loader2, CheckCircle2,
} from "lucide-react";
import { getCustomer, getProfile, type Profile } from "@/data/profiles";
import { rankMatches, type MatchScore } from "@/lib/matching";
import { aiExplainMatch, aiGenerateIntro } from "@/lib/ai.functions";
import { getCustomerData, addNote, recordSentMatch } from "@/lib/customer-data.functions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/customers/$id")({
  loader: ({ params }) => {
    const customer = getCustomer(params.id);
    if (!customer) throw notFound();
    return { customer };
  },
  component: CustomerDetail,
  notFoundComponent: () => (
    <div className="text-center py-20">
      <p className="text-muted-foreground">Customer not found.</p>
      <Link to="/dashboard" className="text-primary underline mt-2 inline-block">Back to dashboard</Link>
    </div>
  ),
});

function summarize(p: Profile) {
  return {
    firstName: p.firstName, lastName: p.lastName, age: p.age, city: p.city,
    designation: p.designation, company: p.company, religion: p.religion,
    wantKids: p.wantKids, hobbies: p.hobbies,
  };
}

function CustomerDetail() {
  const { customer } = Route.useLoaderData();
  const matches = useMemo(() => rankMatches(customer).slice(0, 12), [customer]);

  const fetchData = useServerFn(getCustomerData);
  const { data, refetch } = useQuery({
    queryKey: ["customer-data", customer.id],
    queryFn: () => fetchData({ data: { customerId: customer.id } }),
  });

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4 mr-1" /> Back to clients
      </Link>

      <header className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/20 font-display text-3xl text-primary">
            {customer.firstName[0]}{customer.lastName[0]}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-3xl">{customer.firstName} {customer.lastName}</h1>
            <p className="text-muted-foreground mt-1">
              {customer.age} · {customer.gender} · {customer.city}, {customer.country} · {customer.maritalStatus}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary"><Briefcase className="size-3 mr-1" />{customer.designation} · {customer.company}</Badge>
              <Badge variant="secondary"><GraduationCap className="size-3 mr-1" />{customer.degree}</Badge>
              <Badge variant="secondary">₹{customer.income} LPA</Badge>
            </div>
          </div>
        </div>
      </header>

      <Tabs defaultValue="bio">
        <TabsList>
          <TabsTrigger value="bio">Biodata</TabsTrigger>
          <TabsTrigger value="matches">Suggested matches</TabsTrigger>
          <TabsTrigger value="notes">Notes & history</TabsTrigger>
        </TabsList>

        <TabsContent value="bio" className="mt-4">
          <Biodata customer={customer} />
        </TabsContent>

        <TabsContent value="matches" className="mt-4">
          <MatchesSection
            customer={customer}
            matches={matches}
            sentIds={new Set((data?.sentMatches ?? []).map((m) => m.match_profile_id))}
            onSent={refetch}
          />
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <NotesSection
            customerId={customer.id}
            notes={data?.notes ?? []}
            sentMatches={data?.sentMatches ?? []}
            onChange={refetch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, value, icon: Icon }: { label: string; value: ReactNode; icon?: ComponentType<{ className?: string }> }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
        {Icon && <Icon className="size-3" />} {label}
      </div>
      <div className="mt-0.5 text-sm font-medium break-words max-w-full">{value}</div>
    </div>
  );
}

function Biodata({ customer }: { customer: Profile }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Section title="Personal">
        <Field label="First Name" value={customer.firstName} />
        <Field label="Last Name" value={customer.lastName} />
        <Field label="Date of Birth" value={customer.dob} />
        <Field label="Gender" value={customer.gender} />
        <Field label="Height" value={`${customer.height} cm`} />
        <Field label="Marital Status" value={customer.maritalStatus} />
        <Field label="Siblings" value={customer.siblings} />
      </Section>
      <Section title="Contact & Location">
        <Field label="Email" value={customer.email} icon={Mail} />
        <Field label="Phone" value={customer.phone} icon={Phone} />
        <Field label="Country" value={customer.country} />
        <Field label="City" value={customer.city} icon={MapPin} />
      </Section>
      <Section title="Education & Career">
        <Field label="Undergraduate College" value={customer.college} icon={GraduationCap} />
        <Field label="Degree" value={customer.degree} />
        <Field label="Current Company" value={customer.company} icon={Briefcase} />
        <Field label="Designation" value={customer.designation} />
        <Field label="Income" value={`₹${customer.income} LPA`} />
      </Section>
      <Section title="Background">
        <Field label="Religion" value={customer.religion} />
        <Field label="Caste / Community" value={customer.caste} />
        <Field label="Mother Tongue" value={customer.motherTongue} />
        <Field label="Languages Known" value={customer.languages.join(", ")} icon={Languages} />
      </Section>
      <Section title="Lifestyle">
        <Field label="Diet" value={customer.diet} />
        <Field label="Drinks" value={customer.drinks} />
        <Field label="Smokes" value={customer.smokes} />
        <Field label="Hobbies" value={customer.hobbies.join(", ")} />
      </Section>
      <Section title="Preferences">
        <Field label="Want Kids" value={customer.wantKids} />
        <Field label="Open to Relocate" value={customer.openToRelocate} />
        <Field label="Open to Pets" value={customer.openToPets} />
      </Section>
      <div className="lg:col-span-3 rounded-xl border border-border/60 bg-card p-5">
        <h3 className="font-display text-lg mb-2">About</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{customer.about}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <h3 className="font-display text-lg mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">{children}</div>
    </div>
  );
}

function MatchesSection({
  customer, matches, sentIds, onSent,
}: { customer: Profile; matches: MatchScore[]; sentIds: Set<string>; onSent: () => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {matches.map((m) => (
        <MatchCard key={m.profile.id} customer={customer} match={m} alreadySent={sentIds.has(m.profile.id)} onSent={onSent} />
      ))}
    </div>
  );
}

const tierStyles: Record<MatchScore["tier"], string> = {
  "High Potential": "bg-rose-50 text-rose-800 border-rose-200",
  "Strong": "bg-amber-50 text-amber-800 border-amber-200",
  "Worth Considering": "bg-zinc-100 text-zinc-700 border-zinc-300",
};

function MatchCard({ customer, match, alreadySent, onSent }: { customer: Profile; match: MatchScore; alreadySent: boolean; onSent: () => void }) {
  const p = match.profile;
  const [explanation, setExplanation] = useState<string | null>(null);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState<string | null>(null);

  const explain = useServerFn(aiExplainMatch);
  const intro = useServerFn(aiGenerateIntro);
  const record = useServerFn(recordSentMatch);

  const explainM = useMutation({
    mutationFn: () => explain({ data: { customer: summarize(customer), match: summarize(p), ruleScore: match.score, ruleReasons: match.reasons } }),
    onSuccess: (r) => setExplanation(r.explanation),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to generate"),
  });

  const sendM = useMutation({
    mutationFn: async () => {
      let draft = emailDraft;
      if (!draft) {
        const r = await intro({ data: { customer: summarize(customer), match: summarize(p) } });
        draft = r.email;
        setEmailDraft(draft);
      }
      return draft;
    },
    onSuccess: () => setEmailOpen(true),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to draft email"),
  });

  const confirmSendM = useMutation({
    mutationFn: () => record({ data: { customerId: customer.id, matchProfileId: p.id, introEmail: emailDraft ?? undefined } }),
    onSuccess: () => {
      toast.success(`Match sent to ${customer.firstName}'s inbox (mock).`);
      setEmailOpen(false);
      onSent();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to send"),
  });

  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-display text-lg">{p.firstName} {p.lastName}</h4>
            <Badge variant="outline" className={tierStyles[match.tier]}>{match.tier}</Badge>
            {alreadySent && <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200"><CheckCircle2 className="size-3 mr-1" />Sent</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{p.age} · {p.designation} at {p.company} · {p.city}</p>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl text-primary">{match.score}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">score</div>
        </div>
      </div>

      {match.reasons.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {match.reasons.map((r) => (
            <span key={r} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{r}</span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div>Height: {p.height}cm</div>
        <div>₹{p.income} LPA</div>
        <div>{p.religion}</div>
        <div>Kids: {p.wantKids}</div>
        <div>Relocate: {p.openToRelocate}</div>
        <div>{p.diet}</div>
      </div>

      {explanation && (
        <div className="rounded-lg bg-rose-50/60 border border-rose-200/60 p-3 text-sm">
          <div className="flex items-center gap-1.5 text-rose-800 font-medium mb-1"><Sparkles className="size-3.5" /> AI reasoning</div>
          <p className="text-foreground/80 leading-relaxed">{explanation}</p>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button variant="outline" size="sm" onClick={() => explainM.mutate()} disabled={explainM.isPending}>
          {explainM.isPending ? <Loader2 className="size-3.5 mr-1 animate-spin" /> : <Sparkles className="size-3.5 mr-1" />}
          Why this match?
        </Button>
        <Button size="sm" onClick={() => sendM.mutate()} disabled={sendM.isPending}>
          {sendM.isPending ? <Loader2 className="size-3.5 mr-1 animate-spin" /> : <Send className="size-3.5 mr-1" />}
          Send Match
        </Button>
      </div>

      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <Heart className="size-5 text-primary fill-current" />
              Introducing {p.firstName} to {customer.firstName}
            </DialogTitle>
            <DialogDescription>AI-generated draft — review before sending.</DialogDescription>
          </DialogHeader>
          <Textarea
            className="min-h-[260px] font-mono text-sm"
            value={emailDraft ?? ""}
            onChange={(e) => setEmailDraft(e.target.value)}
          />
          <div className="rounded-lg border bg-muted/30 p-3 text-xs space-y-1">
            <div className="font-semibold">Match profile snapshot</div>
            <div>{p.firstName} {p.lastName} · {p.age} · {p.designation} at {p.company}</div>
            <div>{p.city} · {p.religion} · ₹{p.income} LPA · {p.height}cm</div>
            <div>Hobbies: {p.hobbies.join(", ")}</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailOpen(false)}>Cancel</Button>
            <Button onClick={() => confirmSendM.mutate()} disabled={confirmSendM.isPending}>
              {confirmSendM.isPending ? <Loader2 className="size-4 mr-1 animate-spin" /> : <Send className="size-4 mr-1" />}
              Send (mock email)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface NoteRow { id: string; content: string; created_at: string }
interface SentRow { id: string; match_profile_id: string; created_at: string }

function NotesSection({
  customerId, notes, sentMatches, onChange,
}: { customerId: string; notes: NoteRow[]; sentMatches: SentRow[]; onChange: () => void }) {
  const [draft, setDraft] = useState("");
  const add = useServerFn(addNote);
  const qc = useQueryClient();
  const addM = useMutation({
    mutationFn: () => add({ data: { customerId, content: draft.trim() } }),
    onSuccess: () => {
      setDraft("");
      onChange();
      qc.invalidateQueries({ queryKey: ["customer-data", customerId] });
      toast.success("Note added");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to add note"),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border/60 bg-card p-5">
        <h3 className="font-display text-lg mb-3">Quick notes</h3>
        <div className="space-y-3">
          <Textarea
            placeholder="Notes from the last meeting or call…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
          />
          <Button onClick={() => addM.mutate()} disabled={!draft.trim() || addM.isPending}>
            {addM.isPending ? "Saving…" : "Add note"}
          </Button>
        </div>
        <div className="space-y-3 mt-5">
          {notes.length === 0 && <p className="text-sm text-muted-foreground">No notes yet.</p>}
          {notes.map((n) => (
            <div key={n.id} className="rounded-lg bg-muted/40 p-3 text-sm">
              <div className="text-xs text-muted-foreground mb-1">{new Date(n.created_at).toLocaleString()}</div>
              <p className="whitespace-pre-wrap">{n.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-5">
        <h3 className="font-display text-lg mb-3 flex items-center gap-2"><Users className="size-4" /> Match history</h3>
        {sentMatches.length === 0 && <p className="text-sm text-muted-foreground">No matches sent yet.</p>}
        <div className="space-y-2">
          {sentMatches.map((s) => {
            const p = getProfile(s.match_profile_id);
            return (
              <div key={s.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                <div>
                  <div className="font-medium">{p ? `${p.firstName} ${p.lastName}` : s.match_profile_id}</div>
                  <div className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</div>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">Sent</Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
