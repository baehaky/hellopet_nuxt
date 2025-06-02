export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    if (!authStore.isInitialized) {
        await authStore.initialize();
    }

    const publicPages = ['/', '/login', '/register', '/tentang-kami', '/informasi',  '/informasi/penyakitanjing'];

    if (!authStore.isLoggedIn && (!publicPages.includes(to.path) || to.path === '/listgrooming' || to.path === '/jadwal-dokter')) {
        return navigateTo('/login');
    }
});
