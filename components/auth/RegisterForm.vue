<script setup>
import { useAuthStore } from "@/stores/auth";

const showConfirmationPopup = ref(false);

const closePopup = () => {
  showConfirmationPopup.value = false;
  router.push("/"); 
};

const router = useRouter();
const auth = useAuthStore();
const toast = useToast();

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  first_name: "",
  last_name: "",
  phone_number: "",
});

const formFields = [
  {
    name: "first_name",
    type: "text",
    placeholder: "Nama Depan",
    required: true,
    col: "md:w-1/2 md:pr-2",
  },
  {
    name: "last_name",
    type: "text",
    placeholder: "Nama Belakang",
    required: true,
    col: "md:w-1/2 md:pl-2",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
    col: "w-full",
  },
  {
    name: "phone_number",
    type: "tel",
    placeholder: "Nomor Handphone (contoh: +628123456789)",
    required: true,
    col: "w-full",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
    col: "md:w-1/2 md:pr-2",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Konfirmasi Password",
    required: true,
    col: "md:w-1/2 md:pl-2",
  },
];

const isFormValid = computed(() => {
  return Object.keys(form).every((key) => form[key].length > 0);
});

const submitForm = async () => {
  if (!isFormValid.value) {
    toast.error("Mohon lengkapi semua field yang diperlukan!", {
      timeout: 4000,
    });
    return;
  }

  if (form.password !== form.confirmPassword) {
    toast.error("Password dan konfirmasi password harus sama!", {
      timeout: 4000,
    });
    return;
  }

  try {
    const userData = {
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
      phone_number: form.phone_number,
    };

    const success = await auth.register(userData);

    if (success) {
      showConfirmationPopup.value = true;
      toast.success("Pendaftaran berhasil! Silakan konfirmasi email Anda.");
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Pendaftaran gagal! Silakan coba lagi.", {
      timeout: 4000,
    });
  }
};
</script>

<template>
  <form
    class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto flex flex-wrap"
    @submit.prevent="submitForm"
  >
    <template v-for="field in formFields" :key="field.name">
      <div :class="`pb-2 pt-4 w-full ${field.col || ''}`">
        <input
          v-model="form[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="block w-full p-4 text-lg rounded-sm border-2"
        />
      </div>
    </template>

    <div class="px-4 pb-2 pt-4 w-full">
      <button
        type="submit"
        class="uppercase block w-full p-4 text-lg rounded-md bg-teal-400 hover:bg-teal-600 text-white"
        :disabled="auth.loading"
      >
        {{ auth.loading ? "Loading..." : "Daftar" }}
      </button>
    </div>
  </form>

  <Transition name="fade">
    <div
      v-if="showConfirmationPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center"
      >
        <h2 class="text-xl font-semibold mb-4">Konfirmasi Email Diperlukan</h2>
        <p class="mb-4">
          Kami telah mengirimkan email konfirmasi ke
          <strong>{{ form.email }}</strong
          >. Silakan periksa email Anda dan klik tautan konfirmasi untuk
          menyelesaikan pendaftaran.
        </p>
        <button
          class="mt-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          @click="closePopup"
        >
          Tutup
        </button>
      </div>
    </div>
  </Transition>
</template>
