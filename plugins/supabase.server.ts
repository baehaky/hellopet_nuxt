import { createClient } from "@supabase/supabase-js";
import { getCookie } from "h3";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const event = nuxtApp.ssrContext?.event;

  const token = event ? getCookie(event, "sb-access-token") : null;

  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey, {
    global: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    },
  });

  return {
    provide: {
      supabase,
    },
  };
});
