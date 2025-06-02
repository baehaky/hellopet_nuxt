<script setup>
const props = defineProps({
    isMobileOpen: Boolean,
    navItems: {
        type: Array,
        default: () => []
    },
    isLoggedIn: Boolean,
    isLoading: Boolean,
});

const emit = defineEmits(["close", "logout"]);

const route = useRoute(); // Nuxt's useRoute composable

const handleClose = () => {
    emit("close");
};

const handleLogout = () => {
    emit("logout");
    handleClose();
};
</script>

<template>
    <div v-show="isMobileOpen" class="md:hidden px-6 pb-4">
        <div class="flex flex-col gap-4">
            <NuxtLink
                v-for="item in navItems"
                :key="item.name"
                :class="[
                    'text-black font-serif flex gap-x-1.5 hover:text-[#16BDCA] hover:underline hover:[text-underline-offset:4px] transition-all delay-100',
                    route.path === item.path ? 'font-bold text-[#16BDCA] underline' : '',
                ]"
                :to="item.path"
                @click="handleClose"
            >
                {{ item.name }}
            </NuxtLink>

            <NuxtLink v-if="!isLoggedIn" to="/login" @click="handleClose">
                <button
                    class="bg-[#16BDCA] py-1.5 px-3.5 text-white rounded-lg w-full mt-2"
                >
                    Masuk
                </button>
            </NuxtLink>

            <button
                v-else
                class="bg-red-500 py-1.5 px-3.5 text-white rounded-lg w-full mt-2 disabled:opacity-50"
                :disabled="isLoading"
                @click="handleLogout"
            >
                <span v-if="isLoading">Memproses...</span>
                <span v-else>Keluar</span>
            </button>
        </div>
    </div>
</template>
