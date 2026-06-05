import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getCustomerData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ customerId: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const [notes, sent] = await Promise.all([
      supabase.from("notes").select("*").eq("customer_id", data.customerId).order("created_at", { ascending: false }),
      supabase.from("sent_matches").select("*").eq("customer_id", data.customerId).order("created_at", { ascending: false }),
    ]);
    return {
      notes: notes.data ?? [],
      sentMatches: sent.data ?? [],
    };
  });

export const addNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ customerId: z.string(), content: z.string().min(1).max(2000) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      customer_id: data.customerId,
      content: data.content,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const recordSentMatch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      customerId: z.string(),
      matchProfileId: z.string(),
      introEmail: z.string().max(4000).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("sent_matches").upsert(
      {
        user_id: userId,
        customer_id: data.customerId,
        match_profile_id: data.matchProfileId,
        intro_email: data.introEmail ?? null,
      },
      { onConflict: "user_id,customer_id,match_profile_id" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });
