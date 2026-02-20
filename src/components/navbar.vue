<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isHomePage = route.path === "/";
const menuOpen = ref(false);
</script>

<template>
    <!-- NAVBAR -->
    <nav
        :class="[
            'top-0 w-full z-50 py-4 px-6 lg:px-20 transition-all duration-500 flex items-center justify-between',
            isHomePage
                ? 'absolute bg-transparent'
                : 'relative bg-primary border-b border-gray-200',
        ]"
    >
        <!-- LOGO -->
        <RouterLink to="/" class="flex items-center space-x-2">
            <img
                src="../assets/img/ICOCG.png"
                alt="Logo Cartogenre"
                class="w-8 h-8 md:w-10 md:h-10"
            />
            <span
                :class="[
                    'text-2xl font-poppins font-semibold tracking-widest',
                    isHomePage ? 'text-white' : 'text-gray-50',
                ]"
            >
                CARTOGENRE
            </span>
        </RouterLink>

        <!-- BURGER (mobile) -->
        <button
            @click="menuOpen = !menuOpen"
            class="lg:hidden text-white focus:outline-none"
        >
            <i
                :class="[
                    'text-2xl transition',
                    menuOpen ? 'fas fa-times' : 'fas fa-bars',
                ]"
            ></i>
        </button>

        <!-- MENU DESKTOP -->
        <ul class="hidden lg:flex space-x-10 font-poppins text-sm font-medium">
            <li>
                <RouterLink
                    to="/chantierPage"
                    class="relative flex items-center justify-between group text-sm lg:text-base font-poppins font-medium mb-2 transition-all duration-300"
                    :class="[
                        route.path === '/chantierPage'
                            ? 'text-secondary'
                            : isHomePage
                            ? 'text-white hover:text-primary'
                            : 'text-gray-50 hover:text-secondary',
                    ]"
                >
                    <span>Le genre en pratiques</span>
                    <span
                        :class="[
                            'absolute -bottom-1 left-1/2 h-0.5 transition-all duration-300',
                            route.path === '/chantierPage'
                                ? 'bg-secondary w-1/2'
                                : isHomePage
                                ? 'bg-primary w-0 group-hover:w-1/2'
                                : 'bg-secondary w-0 group-hover:w-1/2',
                        ]"
                    ></span>
                    <span
                        :class="[
                            'absolute -bottom-1 right-1/2 h-0.5 transition-all duration-300',
                            route.path === '/chantierPage'
                                ? 'bg-secondary w-1/2'
                                : isHomePage
                                ? 'bg-primary w-0 group-hover:w-1/2'
                                : 'bg-secondary w-0 group-hover:w-1/2',
                        ]"
                    ></span>
                </RouterLink>
            </li>

            <li>
                <RouterLink
                    to="/statPage"
                    class="relative flex items-center justify-between group text-sm lg:text-base font-poppins font-medium mb-2 transition-all duration-300"
                    :class="[
                        route.path === '/statPage'
                            ? 'text-secondary'
                            : isHomePage
                            ? 'text-white hover:text-primary'
                            : 'text-gray-50 hover:text-secondary',
                    ]"
                >
                    <span>Statistiques</span>
                    <span
                        :class="[
                            'absolute -bottom-1 left-1/2 h-0.5 transition-all duration-300',
                            route.path === '/statPage'
                                ? 'bg-secondary w-1/2'
                                : isHomePage
                                ? 'bg-primary w-0 group-hover:w-1/2'
                                : 'bg-secondary w-0 group-hover:w-1/2',
                        ]"
                    ></span>
                    <span
                        :class="[
                            'absolute -bottom-1 right-1/2 h-0.5 transition-all duration-300',
                            route.path === '/statPage'
                                ? 'bg-secondary w-1/2'
                                : isHomePage
                                ? 'bg-primary w-0 group-hover:w-1/2'
                                : 'bg-secondary w-0 group-hover:w-1/2',
                        ]"
                    ></span>
                </RouterLink>
            </li>

            <li>
                <RouterLink
                    to="/forumPage"
                    class="relative flex items-center justify-between group text-sm lg:text-base font-poppins font-medium mb-2 transition-all duration-300"
                    :class="[
                        route.path === '/forumPage'
                            ? 'text-secondary'
                            : isHomePage
                            ? 'text-white hover:text-primary'
                            : 'text-gray-50 hover:text-secondary',
                    ]"
                >
                    <span>Témoignage</span>
                    <span
                        :class="[
                            'absolute -bottom-1 left-1/2 h-0.5 transition-all duration-300',
                            route.path === '/forumPage'
                                ? 'bg-secondary w-1/2'
                                : isHomePage
                                ? 'bg-primary w-0 group-hover:w-1/2'
                                : 'bg-secondary w-0 group-hover:w-1/2',
                        ]"
                    ></span>
                    <span
                        :class="[
                            'absolute -bottom-1 right-1/2 h-0.5 transition-all duration-300',
                            route.path === '/forumPage'
                                ? 'bg-secondary w-1/2'
                                : isHomePage
                                ? 'bg-primary w-0 group-hover:w-1/2'
                                : 'bg-secondary w-0 group-hover:w-1/2',
                        ]"
                    ></span>
                </RouterLink>
            </li>
        </ul>
    </nav>

    <!-- MENU MOBILE -->
    <transition name="slide-top">
        <div v-if="menuOpen" class="lg:hidden fixed inset-0 z-40">
            <div
                class="absolute inset-0 bg-black/40 backdrop-blur-sm"
                @click.self="menuOpen = false"
            ></div>

            <div
                class="absolute top-0 left-0 w-full bg-primary/90 px-6 py-10 space-y-6 text-white font-poppins text-lg z-50"
            >
                <RouterLink
                    to="/chantierPage"
                    class="block"
                    @click="menuOpen = false"
                    :class="[
                        route.path === '/chantierPage'
                            ? 'text-secondary font-bold underline underline-offset-4'
                            : '',
                    ]"
                >
                    Le genre en pratiques
                </RouterLink>
                <RouterLink
                    to="/statPage"
                    class="block"
                    @click="menuOpen = false"
                    :class="[
                        route.path === '/statPage'
                            ? 'text-secondary font-bold underline underline-offset-4'
                            : '',
                    ]"
                >
                    Statistiques
                </RouterLink>
                <RouterLink
                    to="/forumPage"
                    class="block"
                    @click="menuOpen = false"
                    :class="[
                        route.path === '/forumPage'
                            ? 'text-secondary font-bold underline underline-offset-4'
                            : '',
                    ]"
                >
                    Témoignage
                </RouterLink>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-top-enter-active,
.slide-top-leave-active {
    transition: all 0.3s ease;
}
.slide-top-enter-from {
    transform: translateY(-100%);
    opacity: 0;
}
.slide-top-enter-to {
    transform: translateY(0);
    opacity: 1;
}
.slide-top-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
