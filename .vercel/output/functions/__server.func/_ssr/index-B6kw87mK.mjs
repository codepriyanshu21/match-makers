import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-D_vfBtzt.mjs";
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
function IndexRedirect() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      navigate({
        to: data.session ? "/dashboard" : "/auth",
        replace: true
      });
    });
  }, [navigate]);
  return null;
}
export {
  IndexRedirect as component
};
