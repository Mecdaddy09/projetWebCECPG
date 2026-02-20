<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const vimeoVideos = [
    { id: "1164442147" },
    { id: "1164442101" },
    { id: "1164442165" },
];

const buildVimeoEmbedUrl = (
    { id, hash },
    {
        background = false,
        autoplay = true,
        loop = true,
        muted = true,
        controls = true,
    } = {},
) => {
    const params = new URLSearchParams({
        autoplay: autoplay ? "1" : "0",
        loop: loop ? "1" : "0",
        muted: muted ? "1" : "0",
        autopause: "0",
        dnt: "1",
        playsinline: "1",
        title: "0",
        byline: "0",
        portrait: "0",
    });

    if (background) {
        params.set("background", "1");
    } else {
        params.set("controls", controls ? "1" : "0");
    }

    if (hash) {
        params.set("h", hash);
    }

    return `https://player.vimeo.com/video/${id}?${params.toString()}`;
};

const slideMedias = vimeoVideos.map((video) => ({
    background: buildVimeoEmbedUrl(video, {
        background: true,
        autoplay: true,
        loop: true,
        muted: true,
        controls: false,
    }),
    modal: buildVimeoEmbedUrl(video, {
        background: false,
        autoplay: true,
        loop: false,
        muted: false,
        controls: true,
    }),
}));

const slides = ref([
    {
        id: 0,
        video: slideMedias[0].background,
        modalVideo: slideMedias[0].modal,
        title: "les enjeux de genre dans la",
        text: " TOILETTES",
        textprogres: "TOILETTES",
        description:
            "À l’Université de Fianarantsoa, une analyse des pratiques genrées révèle des disparités marquées entre étudiant·es, personnel administratif et enseignant·es, tant en termes d’accessibilité aux infrastructures sanitaires que de conditions d’usage.",
        buttons: [
            {
                text: "EN SAVOIR PLUS",
                class: "border-0 bg-secondary tracking-[3px] font-poppins font-medium",
            },
            {
                text: "REGARDER LA VIDEO",
                class: "bg-transparent text-white border border-primary font-poppins font-medium",
            },
        ],
    },
    {
        id: 1,
        video: slideMedias[1].background,
        modalVideo: slideMedias[1].modal,
        title: "les enjeux de genre dans la",
        text: "MOBILITES",
        textprogres: "MOBILITES",
        description:
            "Un campus fonctionnel et inclusif doit garantir une circulation fluide et sécurisée pour tous, permettant à chacun de rejoindre ses activités académiques et professionnelles dans des conditions optimales.",
        buttons: [
            {
                text: "EN SAVOIR PLUS",
                class: "border-0 bg-secondary tracking-[3px] font-poppins font-medium",
            },
            {
                text: "REGARDER LA VIDEO",
                class: "bg-transparent text-white border border-primary font-poppins font-medium",
            },
        ],
    },
    {
        id: 2,
        video: slideMedias[2].background,
        modalVideo: slideMedias[2].modal,
        title: "les enjeux de genre dans l’accès aux",
        text: "VIE ASSOCIATIVE",
        textprogres: "VIE ASSOCIATIVE",
        description:
            "La vie associative est un facteur de gain en capital social et spatial pour les étudiants de l’université de Fianarantsoa. Souvent, les pratiques au sein de cet univers reproduisent des rôles et des attentes genrées, influençant l’attribution des rôles et des responsabilités, les interactions et les opportunités offertes aux individus.",
        buttons: [
            {
                text: "EN SAVOIR PLUS",
                class: "border-0 bg-secondary tracking-[3px] font-poppins font-medium",
            },
            {
                text: "REGARDER LA VIDEO",
                class: "bg-transparent text-white border border-primary font-poppins font-medium",
            },
        ],
    },
]);

const currentSlide = ref(0);
const progressBars = ref(slides.value.map(() => 0));
const openModal = ref(false);
const modalVideo = ref("");
const isHovered = ref(false);
const isPlaying = ref(true);
const router = useRouter();

const SLIDE_DURATION_MS = 12000;
const PROGRESS_TICK_MS = 100;
let progressTimer = null;
let carousel = null;
let onTouchStart = null;
let onTouchEnd = null;
let startX = 0;

const navigateToPage = (index) => {
    switch (index) {
        case 0:
            router.push("/vieAssociative");
            break;
        case 1:
            router.push("/mobilite");
            break;
        case 2:
            router.push("/toillete");
            break;
    }
};

const resetProgressBar = () => {
    progressBars.value = slides.value.map(() => 0);
};

const resetSlideContentAnimation = () => {
    const elements = document.querySelectorAll(".animate-slide-content");
    elements.forEach((el) => {
        el.classList.remove("appear");
        void el.offsetWidth;
        el.classList.add("appear");
    });
};

const stopProgressTimer = () => {
    if (!progressTimer) {
        return;
    }

    clearInterval(progressTimer);
    progressTimer = null;
};

const startProgressTimer = () => {
    stopProgressTimer();

    progressTimer = setInterval(() => {
        if (!isPlaying.value || openModal.value) {
            return;
        }

        const index = currentSlide.value;
        const progressStep = (PROGRESS_TICK_MS / SLIDE_DURATION_MS) * 100;
        const updatedProgress = Math.min(
            progressBars.value[index] + progressStep,
            100,
        );

        progressBars.value[index] = updatedProgress;

        if (updatedProgress >= 100) {
            nextSlide();
        }
    }, PROGRESS_TICK_MS);
};

const setSlide = (index) => {
    resetProgressBar();
    resetSlideContentAnimation();
    currentSlide.value = index;
    if (isPlaying.value && !openModal.value) {
        startProgressTimer();
    }
};

const nextSlide = () => {
    const nextIndex = (currentSlide.value + 1) % slides.value.length;
    setSlide(nextIndex);
};

const prevSlide = () => {
    const previousIndex =
        (currentSlide.value - 1 + slides.value.length) % slides.value.length;
    setSlide(previousIndex);
};

const togglePlayPause = () => {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
        startProgressTimer();
    } else {
        stopProgressTimer();
    }
};

const openModalVideo = (index) => {
    modalVideo.value = slides.value[index].modalVideo;
    openModal.value = true;
    isPlaying.value = false;
    stopProgressTimer();
};

const closeModal = () => {
    openModal.value = false;
    modalVideo.value = "";
    isPlaying.value = true;
    startProgressTimer();
};

onMounted(() => {
    carousel = document.querySelector(".carousel-wrapper");

    if (carousel) {
        onTouchStart = (e) => {
            startX = e.touches[0].clientX;
        };
        onTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            const diffX = endX - startX;
            if (diffX > 50) {
                prevSlide();
            } else if (diffX < -50) {
                nextSlide();
            }
        };

        carousel.addEventListener("touchstart", onTouchStart);
        carousel.addEventListener("touchend", onTouchEnd);
    }

    startProgressTimer();
});

onBeforeUnmount(() => {
    stopProgressTimer();
    if (carousel && onTouchStart && onTouchEnd) {
        carousel.removeEventListener("touchstart", onTouchStart);
        carousel.removeEventListener("touchend", onTouchEnd);
    }
});
</script>

<template>
    <div
        class="relative w-full h-[100vh] overflow-hidden carousel-wrapper"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <div
            class="relative flex transition-transform duration-500 ease-in-out w-full h-full"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
            <div
                v-for="(slide, index) in slides"
                :key="slide.id"
                class="w-full h-full flex-shrink-0 relative overflow-hidden"
            >
                <iframe
                    :title="`Vimeo slide ${index + 1}`"
                    :src="slide.video"
                    class="vimeo-slide z-0"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <div
                    class="absolute inset-0 bg-black/60 z-10 pointer-events-none"
                ></div>

                <div
                    class="absolute content-block top-[60%] sm:top-[50%] md:top-[40%] lg:top-[110%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-[80%] px-4 sm:px-0 pr-0 md:pr-[25%] text-white drop-shadow-[0_5px_10px_#0007] z-20"
                >
                    <div
                        class="author font-poppins font-bold tracking-[6px] sm:tracking-[8px] md:tracking-[10px] animate-slide-content text-center sm:text-left"
                    >
                        {{ slide.title }}
                    </div>

                    <div
                        class="title font-poppins font-bold text-[2em] sm:text-[3em] md:text-[4em] lg:text-[5em] leading-[1.3em] animate-slide-content text-center sm:text-left"
                    >
                        {{ slide.subtitle }}
                    </div>

                    <div
                        class="topic font-poppins font-bold text-[2em] sm:text-[3em] md:text-[4em] lg:text-[5em] leading-[1.3em] text-primary animate-slide-content text-center sm:text-left mb-4"
                    >
                        {{ slide.text }}
                    </div>

                    <div
                        class="des mt-4 max-w-xl animate-slide-content text-center sm:text-left mx-auto sm:mx-0"
                    >
                        {{ slide.description }}
                    </div>

                    <div
                        class="grid grid-cols-1 sm:[grid-template-columns:repeat(2,190px)] [grid-template-rows:40px] gap-[10px] mt-[20px] animate-slide-content justify-center sm:justify-start"
                    >
                        <button
                            v-for="(button, buttonIndex) in slide.buttons"
                            :key="buttonIndex"
                            :class="button.class"
                            @click="
                                button.text === 'REGARDER LA VIDEO' &&
                                    openModalVideo(index);
                                button.text === 'EN SAVOIR PLUS' &&
                                    navigateToPage(index);
                            "
                        >
                            {{ button.text }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <Transition name="fade">
            <button
                v-if="isHovered"
                @click="prevSlide"
                class="absolute group p-2 flex justify-center items-center border border-secondary w-16 h-16 transition-all duration-500 rounded-full top-2/4 -translate-y-8 left-5 hover:bg-secondary"
            >
                <svg
                    class="h-12 w-12 text-white group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </Transition>

        <Transition name="fade">
            <button
                v-if="isHovered"
                @click="nextSlide"
                class="absolute group p-2 flex justify-center items-center border border-secondary w-16 h-16 transition-all duration-500 rounded-full top-2/4 -translate-y-8 right-5 hover:bg-secondary"
            >
                <svg
                    class="h-12 w-12 text-white group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </Transition>

        <!-- Bouton play/pause -->
        <Transition name="fade">
            <button
                v-if="isHovered"
                @click="togglePlayPause"
                class="absolute bottom-20 right-5 bg-black/50 text-white p-2 rounded-full z-30"
            >
                {{ isPlaying ? "Pause" : "Play" }}
            </button>
        </Transition>

        <!-- Barres de progression -->
        <div class="absolute bottom-1 left-0 right-0 flex justify-center gap-2">
            <div
                v-for="(slide, index) in slides"
                :key="slide.id"
                class="w-1/3 flex flex-col items-center"
            >
                <div class="h-1 bg-gray-700 rounded overflow-hidden w-full">
                    <div
                        class="h-1 bg-green-400 rounded transition-all duration-500"
                        :style="{ width: `${progressBars[index]}%` }"
                    ></div>
                </div>
                <div
                    class="text-white text-xs tracking-[5px] font-poppins font-bold mt-2 text-center drop-shadow-[0_1px_5px_#0007]"
                >
                    {{ slide.textprogres }}
                </div>
            </div>
        </div>

        <Teleport to="body">
            <div
                v-if="openModal"
                class="modal fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            >
                <button
                    @click="closeModal"
                    class="z-50 absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                >
                    <span class="sr-only">Fermer la vidéo</span>
                    <svg
                        class="block h-8 w-8 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="M6 6l12 12"></path>
                    </svg>
                </button>

                <iframe
                    :src="modalVideo"
                    class="video-modal"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
/* Transition d'entrée et de sortie des boutons */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
}

.vimeo-slide {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 177.77777778vh;
    height: 56.25vw;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    border: 0;
    pointer-events: none;
}

.video-modal {
    width: 100%;
    height: 100%;
    border: 0;
}

/* Animation d'entrée pour chaque élément du slide */
@keyframes showContent {
    to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
    }
}

/* Applique l'animation sur les éléments */
.animate-slide-content {
    transform: translateY(50px);
    filter: blur(20px);
    opacity: 0;
    animation: showContent 0.5s linear forwards;
}

/* Délais d'animation spécifiques pour chaque élément */
.title {
    animation-delay: 1.2s;
}
.topic {
    animation-delay: 1.4s;
}
.des {
    animation-delay: 1.6s;
}
.grid {
    animation-delay: 1.8s;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .title,
    .topic {
        font-size: 3em;
    }
    .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }
    .content-block {
        top: 15% !important;
        padding-right: 15% !important;
    }
}

/* 📱 Mobile : jusqu’à 640px */
@media (max-width: 640px) {
    .title,
    .topic {
        font-size: 2em;
        text-align: center;
    }
    .author,
    .des,
    .grid {
        text-align: center;
        max-width: 100%;
        margin: 0 auto;
    }
    .content-block {
        top: 50% !important;
        padding: 0 1rem !important;

        text-align: center;
    }
    .w-12.h-12 {
        width: 44px !important;
        height: 44px !important;
    }
    .video-modal {
        height: 100%;
    }
}

/* 📲 Tablette : 641px à 1024px */
@media (min-width: 641px) and (max-width: 1024px) {
    .title,
    .topic {
        font-size: 3.2em;
        text-align: center;
    }
    .author,
    .des,
    .grid {
        text-align: center;
        margin: 0 auto;
    }
    .content-block {
        top: 50% !important;
        padding: 0 2rem !important;

        text-align: center;
    }
}

/* 💻 Ordinateur (desktop) : à partir de 1025px */
@media (min-width: 1025px) {
    .title,
    .topic {
        font-size: 5em;
        text-align: left;
    }
    .author,
    .des,
    .grid {
        text-align: left;
    }
    .content-block {
        top: 45% !important;
        padding-right: 0 !important;
        padding-left: 0 !important;

        text-align: left;
    }
}
</style>
