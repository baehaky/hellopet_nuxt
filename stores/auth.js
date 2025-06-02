import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useAuthCookie } from "@/composables/useAuthCookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    profile: null,
    loading: false,
    isInitialized: false, // tambahkan ini
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async login({ email, password }) {
      this.loading = true;

      const { $supabase } = useNuxtApp();
      const { setToken } = useAuthCookie();

      try {
        const { data, error } = await $supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error || !data.session) throw error;

        this.user = data.user;
        setToken(data.session.access_token);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register({ first_name, last_name, email, password, phone_number }) {
      this.loading = true;
      const { $supabase } = useNuxtApp();

      try {
        const { data: signUpData, error: signUpError } =
          await $supabase.auth.signUp({
            email,
            password,
          });

        if (signUpError) throw signUpError;

        // Simpan data profile sementara di localStorage
        localStorage.setItem(
          "pending_profile",
          JSON.stringify({ first_name, last_name, phone_number })
        );

        return true;
      } catch (error) {
        console.error("[REGISTER FAILED]", error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      const { $supabase } = useNuxtApp();
      const { setToken } = useAuthCookie();

      await $supabase.auth.signOut();
      setToken(null);
      this.user = null;
      this.isInitialized = false; // reset flag
    },

    async initialize() {
      const { $supabase } = useNuxtApp();
      const { data } = await $supabase.auth.getUser();

      if (data.user) {
        this.user = data.user;

        const { data: profile, error: profileError } = await $supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (!profile) {
          const pendingProfile = localStorage.getItem("pending_profile");
          if (pendingProfile) {
            const { first_name, last_name, phone_number } =
              JSON.parse(pendingProfile);

            const { error: insertError } = await $supabase
              .from("profiles")
              .insert({
                id: data.user.id,
                first_name,
                last_name,
                phone_number,
                roles: "user",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });

            if (!insertError) {
              localStorage.removeItem("pending_profile");
              this.profile = {
                id: data.user.id,
                first_name,
                last_name,
                phone_number,
                roles: "user",
              };
            }
          }
        } else {
          this.profile = profile;
        }
      } else {
        this.user = null;
        this.profile = null;
      }

      this.isInitialized = true;
    },
  },
});
