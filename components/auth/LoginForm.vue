<script setup>
import { ref } from "vue";

const form = reactive({
  email: "",
  password: "",
});

const formFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Masukkan email Anda",
    label: "Email",
    icon: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Masukkan password Anda",
    label: "Password",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
];

const showPassword = ref(false);
const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const submitForm = async () => {
  try {
    const res = await auth.login({ ...form });

    if (res) {
      toast.success("Berhasil login");
      const path =
        auth.user?.roles === "dokter" ? `/dashboard/${auth.user.id}` : "/";
      router.push(path);
    } else {
      toast.error("Email/password salah");
    }
  } catch (err) {
    toast.error(err.message || "Terjadi kesalahan");
  }
};
</script>

<template>
  <div class="w-full max-w-md shadow-2xl p-10 rounded-md">
    <form class="space-y-6" @submit.prevent="submitForm">
      <div v-for="field in formFields" :key="field.name" class="space-y-2">
        <label
          :for="field.name"
          class="block text-sm font-medium text-gray-700"
        >
          {{ field.label }}
        </label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="field.icon"
              />
            </svg>
          </div>
          <input
            :id="field.name"
            v-model="form[field.name]"
            :type="
              field.name === 'password' && showPassword ? 'text' : field.type
            "
            :placeholder="field.placeholder"
            class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
            required
          />
          <button
            v-if="field.name === 'password'"
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
            @click="showPassword = !showPassword"
          >
            <svg
              class="h-5 w-5 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!showPassword"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
              />
            </svg>
          </button>
        </div>
      </div>

      <button
        type="submit"
        :disabled="auth.loading"
        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <span
          v-if="auth.loading"
          class="absolute left-0 inset-y-0 flex items-center pl-3"
        >
          <svg
            class="animate-spin h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
        {{ auth.loading ? "Memproses..." : "Masuk ke Akun" }}
      </button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Belum punya akun?
          <NuxtLink
            to="/register"
            class="font-medium text-teal-600 hover:text-teal-500 ml-1"
          >
            Daftar sekarang
          </NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>
