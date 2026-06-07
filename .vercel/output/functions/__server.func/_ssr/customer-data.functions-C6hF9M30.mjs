import { c as createServerRpc } from "./createServerRpc-Bj0yc_8M.mjs";
import { a as createServerFn } from "./server-BwVezT5K.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CM60iMCt.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
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
const getCustomerData_createServerFn_handler = createServerRpc({
  id: "62f78415c6c889d2d38161536f9a2ca754a196ed26e6d0e6487e94bc9f421dec",
  name: "getCustomerData",
  filename: "src/lib/customer-data.functions.ts"
}, (opts) => getCustomerData.__executeServer(opts));
const getCustomerData = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  customerId: stringType()
}).parse(d)).handler(getCustomerData_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  const [notes, sent] = await Promise.all([supabase.from("notes").select("*").eq("customer_id", data.customerId).order("created_at", {
    ascending: false
  }), supabase.from("sent_matches").select("*").eq("customer_id", data.customerId).order("created_at", {
    ascending: false
  })]);
  return {
    notes: notes.data ?? [],
    sentMatches: sent.data ?? []
  };
});
const addNote_createServerFn_handler = createServerRpc({
  id: "967941a0ae5a016ebb717ca4c106e39ce8d360ceac72b0e12406259c43aeb63f",
  name: "addNote",
  filename: "src/lib/customer-data.functions.ts"
}, (opts) => addNote.__executeServer(opts));
const addNote = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  customerId: stringType(),
  content: stringType().min(1).max(2e3)
}).parse(d)).handler(addNote_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("notes").insert({
    user_id: userId,
    customer_id: data.customerId,
    content: data.content
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const recordSentMatch_createServerFn_handler = createServerRpc({
  id: "042203c3a15e5594a66eda91ef000dc008647afbf36cd6cf65160ffbe890e02f",
  name: "recordSentMatch",
  filename: "src/lib/customer-data.functions.ts"
}, (opts) => recordSentMatch.__executeServer(opts));
const recordSentMatch = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  customerId: stringType(),
  matchProfileId: stringType(),
  introEmail: stringType().max(4e3).optional()
}).parse(d)).handler(recordSentMatch_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("sent_matches").upsert({
    user_id: userId,
    customer_id: data.customerId,
    match_profile_id: data.matchProfileId,
    intro_email: data.introEmail ?? null
  }, {
    onConflict: "user_id,customer_id,match_profile_id"
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  addNote_createServerFn_handler,
  getCustomerData_createServerFn_handler,
  recordSentMatch_createServerFn_handler
};
