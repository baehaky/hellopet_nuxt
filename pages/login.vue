<script setup>
import LoginSideInfo from "@/components/auth/LoginSideInfo.vue";
import LoginForm from "@/components/auth/loginForm.vue";
</script>

<template>
  <div class="min-h-screen flex">
    <LoginSideInfo />
    <div
      class="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-8"
    >
      <h1 class="text-2xl font-bold mb-6">Masuk ke Akun Anda</h1>
      <LoginForm />
    </div>
  </div>
</template>
