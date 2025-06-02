<script setup>
import HeroSection from "@/components/HeroSection.vue";
import OurServiceSection from "@/components/OurServiceSection.vue";
import EndSectionHome from "@/components/EndSectionHome.vue";

useHead({
  title: "Beranda - HELLOPET!",
  meta: [
    {
      name: "description",
      content:
        "Selamat datang di HELLOPET! Temukan layanan terbaik untuk hewan peliharaan Anda.",
    },
    {
      name: "keywords",
      content:
        "tentang kami, visi misi, informasi, HELLOPET!, layanan hewan peliharaan, kesehatan hewan",
    },
  ],
});
</script>

<template>
  <HeroSection />
  <OurServiceSection />
  <EndSectionHome />
</template>
