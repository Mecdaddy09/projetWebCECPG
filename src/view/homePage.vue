<script setup>
import MapComponent from "@/components/maps.vue";
import Footer from "@/components/footer.vue";
import Navbar from "@/components/navbar.vue";

const vimeoVideos = [
    { id: "1164438852" },
    { id: "1164438870" },
    { id: "1164438895" },
    { id: "1164438922" },
];

const buildVimeoEmbedUrl = ({ id, hash }) => {
    const params = new URLSearchParams({
        background: "1",
        autoplay: "1",
        loop: "1",
        muted: "1",
        autopause: "0",
        title: "0",
        byline: "0",
        portrait: "0",
        dnt: "1",
        playsinline: "1",
    });

    if (hash) {
        params.set("h", hash);
    }

    return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};

const videoSources = vimeoVideos.map(buildVimeoEmbedUrl);

const services = [
    {
        icon: "fas fa-venus-mars",
        title: "COMPRENDRE LES INÉGALITÉS",
        description:
            "Explorer les inégalités systémiques pour identifier des pistes d'action concrètes.",
    },
    {
        icon: "fas fa-universal-access",
        title: "DEVELOPPER L'INCLUSION",
        description:
            "Favoriser l'accessibilité et la représentation équitable dans les espaces universitaires.",
    },
    {
        icon: "fas fa-balance-scale",
        title: "FAVORISER L'ÉQUITÉ",
        description:
            "Garantir des opportunités justes pour chaque individu au sein de la communauté académique.",
    },
];
</script>

<template>
    <Navbar />
    <!-- HERO avec background image -->
    <section
        class="relative w-full h-[80vh] sm:h-[90vh] md:h-[100vh] lg:h-[100vh]"
    >
        <!-- Grille d'images vidéos -->
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-full w-full gap-0.5"
        >
            <div
                v-for="(src, i) in videoSources"
                :key="i"
                class="relative w-full h-full overflow-hidden"
            >
                <iframe
                    :title="`Vimeo video ${i + 1}`"
                    :src="src"
                    class="vimeo-cover"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>

        <!-- Overlay sombre -->
        <div class="absolute inset-0 bg-black opacity-60 z-0"></div>

        <!-- Contenu centré -->
        <div
            class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center w-full max-w-5xl mx-auto"
        >
            <img
                src="../assets/img/LOGO CARTOGENRE.png"
                alt="Logo Cartogenre"
                class="w-16 sm:w-20 md:w-24 h-auto mb-4"
            />
            <h1
                class="font-poppins font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-primary mb-4"
            >
                CARTOGENRE
            </h1>
            <p
                class="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-full sm:max-w-2xl opacity-90"
            >
                Un site dédié à la représentation des expériences vécues des
                inégalités entre FEMMES ET HOMMES, dans les pratiques, les
                traitements, la façon de penser et la manière d’être perçu par
                les autres sur le campus universitaire d’Andrainjato à
                Fianarantsoa Madagascar.
            </p>
        </div>
    </section>

    <!-- POINTS D'INTÉRÊT -->
    <section
        id="Service"
        class="h-[90vh] sm:h-[100vh] bg-gray-50 flex flex-col justify-center px-4"
    >
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h1
                    class="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800"
                >
                    Dans quel but ?
                </h1>
                <div
                    class="w-20 sm:w-24 h-1 bg-primary mx-auto mt-4 mb-2"
                ></div>
            </div>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                <div
                    v-for="(service, index) in services"
                    :key="index"
                    class="bg-white p-4 sm:p-6 rounded-xl text-center shadow hover:shadow-lg transition duration-300"
                >
                    <div class="text-primary text-4xl sm:text-5xl mb-4">
                        <i :class="service.icon"></i>
                    </div>
                    <h4
                        class="text-lg sm:text-xl font-semibold text-gray-800 mb-2"
                    >
                        {{ service.title }}
                    </h4>
                    <p
                        class="text-gray-600 text-sm sm:text-base leading-relaxed"
                    >
                        {{ service.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- MAP SECTION - Mobile First Responsive -->
    <section class="relative w-full min-h-[120vh] lg:min-h-[130vh] bg-gray-50">
        <div class="text-center mb-6 sm:mb-10 px-4">
            <h1
                class="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800"
            >
                Le campus universitaire d'Andrainjato en carte
            </h1>
            <div class="w-20 sm:w-24 h-1 bg-primary mx-auto mt-4 mb-2"></div>
        </div>
        <div
            class="relative flex flex-col lg:flex-row lg:items-start container mx-auto gap-6 px-4"
        >
            <!-- Carte -->
            <div
                class="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[680px] z-0"
            >
                <MapComponent />
            </div>

            <!-- Panneau texte -->
            <div
                class="relative lg:absolute lg:right-20 lg:top-16 h-auto lg:h-[80%] lg:w-1/3 bg-white/30 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-lg text-secondary flex flex-col justify-between z-10"
            >
                <div
                    class="text-justify text-sm sm:text-base font-poppins font-light overflow-y-auto max-h-[calc(100%-5px)] scrollbar-hidden"
                >
                    <div class="py-2 sm:py-4">
                        <h2
                            class="text-xl sm:text-2xl text-center font-bold tracking-[.10em] mb-4"
                        >
                            L’Université de Fianarantsoa
                        </h2>
                        <p>
                            Cette carte représente le campus universitaire
                            d’Andrainjato à Fianarantsoa, notre principal lieu
                            d’étude. Elle permet de situer les différents
                            espaces fréquentés par les étudiants et étudiantes,
                            les enseignants et enseignantes ainsi que les
                            personnels administratifs et technique. La carte est
                            révélatrice des inégalités de genre sur le campus
                            car elle rend visibles, dans l’espace, des
                            disparités qui restent souvent invisibles dans les
                            pratiques quotidiennes : accès inégal aux lieux,
                            sentiment d’insécurité, préférence inégal d'un
                            endroit...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- GENRE SECTION - Mobile First Responsive -->
    <section
        class="relative w-full h-[100vh] bg-white px-4 pt-10 flex items-start justify-evenly"
    >
        <div class="w-full flex flex-col items-center relative">
            <!-- Avatars en demi-arc -->
            <div
                class="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[540px]"
            >
                <img
                    src="@/assets/img/avatar1.svg"
                    class="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 rounded-full absolute top-[55%] left-[8%] transform -translate-y-1/2 border-4 border-white shadow"
                />
                <img
                    src="@/assets/img/avatar4.svg"
                    class="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 rounded-full absolute top-[20%] left-[22%] transform -translate-y-1/2 border-4 border-white shadow"
                />
                <img
                    src="@/assets/img/avatar2.svg"
                    class="w-14 sm:w-24 md:w-32 h-14 sm:h-24 md:h-32 rounded-full absolute top-[-5%] left-1/2 transform -translate-x-1/2 border-4 border-white shadow z-10"
                />
                <img
                    src="@/assets/img/avatar5.svg"
                    class="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 rounded-full absolute top-[20%] right-[22%] transform -translate-y-1/2 border-4 border-white shadow"
                />
                <img
                    src="@/assets/img/avatar6.svg"
                    class="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 rounded-full absolute top-[55%] right-[8%] transform -translate-y-1/2 border-4 border-white shadow"
                />
            </div>

            <!-- Texte en dessous -->
            <div
                class="w-full absolute top-[40%] max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-center"
            >
                <h1
                    class="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                >
                    Révéler les inégalités de genre sur le campus
                </h1>
                <p
                    class="text-gray-700 mb-4 text-sm sm:text-base md:text-lg leading-relaxed font-normal"
                >
                    Il n’existe aucune loi qui établisse une différence entre
                    les sexes au sein de l’université de Fianarantsoa: hommes et
                    femmes sont traités de manière égale. Ce sont les pratiques
                    sociales des étudiants qui révèlent les inégalités.» Pr
                    Clarisse RASOAMAMPIONONA
                </p>
                <p
                    class="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed font-light opacity-80"
                >
                    L’égalité inscrite dans les textes ne suffit pas toujours à
                    garantir une réalité équitable. À l’université de
                    Fianarantsoa, ce ne sont pas les lois qui divisent, mais les
                    usages, les habitudes et les représentations qui traversent
                    la vie étudiante. C’est dans les détails du quotidien, les
                    ressentis et les façons d’occuper l’espace, que les
                    différences prennent forme. Comprendre ces nuances, souvent
                    invisibles mais bien présentes, demande de l'attention à ce
                    que l’on ne voit pas toujours au premier regard.
                </p>
                <div class="pt-6">
                    <RouterLink
                        to="/chantierPage"
                        class="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
                    >
                        Découvrir
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>

    <Footer class="mt-16" />
</template>

<style scoped>
.vimeo-cover {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    width: auto;
    min-width: 100%;
    min-height: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    transform: translate(-50%, -50%);
    transform-origin: center center;
    pointer-events: none;
}

.scrollbar-hidden::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.scrollbar-hidden::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.scrollbar-hidden::-webkit-scrollbar-track {
    background-color: transparent;
}

.scrollbar-hidden {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}
</style>
