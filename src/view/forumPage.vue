<template>
    <div class="flex flex-row w-full h-[639px] z-0">
        <!-- Section Texte -->
        <div class="basis-1/2 flex flex-col justify-center">
            <!-- Section MAPS -->
            <div class="h-[639px] w-full z-0">
                <DonneCarte />
            </div>
        </div>

        <!-- Section Slider -->
        <div class="basis-1/2 relative">
            <div
                class="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-10 w-full text-center"
            >
                <h1
                    class="font-poppins text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-md"
                >
                    VOTRE TÉMOIGNAGE
                </h1>
                <div
                    class="mt-2 mx-auto w-36 h-1 bg-secondary rounded-full animate-pulse"
                ></div>
            </div>

            <!-- Section Carousel -->
            <div
                class="contents z-0 relative flex justify-center items-center w-full h-[639px]"
            >
                <!-- Carousel container -->
                <div
                    class="slider w-full max-w-full sm:max-w-[600px] md:max-w-[700px] h-[80%] relative overflow-hidden mt-20"
                >
                    <div
                        v-for="slide in slides"
                        :key="slide.id"
                        class="item relative w-full h-full"
                    >
                        <img
                            src="../assets/icon/quote-mark-svgrepo-com.svg"
                            class="absolute top-2 right-8 opacity-50 w-15 h-15"
                        />
                        <h1 class="opacity-50 text-[13px]">
                            {{ slide.title || "Date inconnue" }}
                        </h1>
                        <p class="pt-10">
                            {{ slide.text || "Aucun message..." }}
                        </p>
                    </div>

                    <!-- Boutons de navigation -->
                    <button
                        id="prev"
                        class="slider-button absolute top-1/2 left-5 transform -translate-y-1/2 z-20 hover:bg-gray-700 transition duration-200"
                    >
                        <svg
                            class="h-16 w-16 text-secondary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                    <button
                        id="next"
                        class="slider-button absolute top-1/2 right-5 transform -translate-y-1/2 z-20 hover:bg-gray-700 transition duration-200"
                    >
                        <svg
                            class="h-16 w-16 text-secondary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                </div>
            </div>

            <!-- Lien S'exprimer -->
            <div
                class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-center w-[300px] mx-auto sm:w-[350px] md:w-[400px]"
            >
                <RouterLink
                    to="/formulairePage"
                    class="border-0 bg-primary px-6 py-2 tracking-[3px] font-poppins font-medium text-white hover:bg-secondary/90 transition duration-200 w-full flex justify-center items-center"
                    aria-label="Accéder à la page du formulaire"
                >
                    S'EXPRIMER
                </RouterLink>
            </div>
        </div>
    </div>
    <Footer class="mt-16" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import DonneCarte from "@/components/affichedonnecarte.vue";
import Footer from "@/components/footer.vue";
import { buildApiUrl } from "@/config/api";

const slides = ref([]);
let active = 0;
let refreshIntervalId = null;
let nextButton = null;
let prevButton = null;

const getSliderItems = () => document.querySelectorAll(".slider .item");

const loadShow = () => {
    const items = getSliderItems();
    if (!items.length) {
        return;
    }

    if (active >= items.length) {
        active = items.length - 1;
    }
    if (active < 0) {
        active = 0;
    }

    let stt = 0;
    items[active].style.transform = "none";
    items[active].style.zIndex = String(items.length);
    items[active].style.filter = "none";
    items[active].style.opacity = "1";

    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${
            1 - 0.2 * stt
        }) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = String(items.length - stt);
        items[i].style.filter = "blur(5px)";
        items[i].style.opacity = stt > 2 ? "0" : "0.6";
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${
            1 - 0.2 * stt
        }) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = String(items.length - stt);
        items[i].style.filter = "blur(5px)";
        items[i].style.opacity = stt > 2 ? "0" : "0.6";
    }
};

const bindSliderButtons = () => {
    nextButton = document.getElementById("next");
    prevButton = document.getElementById("prev");

    if (nextButton) {
        nextButton.onclick = () => {
            const items = getSliderItems();
            if (!items.length) {
                return;
            }
            active = active + 1 < items.length ? active + 1 : 0;
            loadShow();
        };
    }

    if (prevButton) {
        prevButton.onclick = () => {
            const items = getSliderItems();
            if (!items.length) {
                return;
            }
            active = active - 1 >= 0 ? active - 1 : items.length - 1;
            loadShow();
        };
    }
};

const fetchFeedbacks = async () => {
    try {
        const response = await fetch(buildApiUrl("fetch_feedbacks.php"));
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} (${response.statusText})`);
        }

        const data = await response.json();
        const entries = Array.isArray(data) ? data : [];

        slides.value = entries.map((item, index) => ({
            id: item.id || index + 1,
            title: item.created_at ? item.created_at.split(" ")[0] : "",
            text: item.message || "",
        }));

        if (active >= slides.value.length) {
            active = 0;
        }

        await nextTick();
        loadShow();
    } catch (error) {
        console.error("Erreur lors du chargement des feedbacks:", error);
    }
};

onMounted(async () => {
    bindSliderButtons();
    await fetchFeedbacks();
    refreshIntervalId = setInterval(fetchFeedbacks, 5000);
});

onBeforeUnmount(() => {
    if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
    }

    if (nextButton) {
        nextButton.onclick = null;
    }

    if (prevButton) {
        prevButton.onclick = null;
    }
});
</script>

<style>
.contents {
    background-image: linear-gradient(to top, #582c4d, #9ad35a);
    margin: 0;
    justify-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
}
.slider {
    position: relative;
    width: 100%;
    height: 350px;
    overflow: hidden;
}
.item {
    position: absolute;
    width: 270px;
    height: 350px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    transition: 0.5s;
    left: calc(50% - 120px);
    top: 0;
    z-index: 0;
}
#next,
#prev {
    position: absolute;
    top: 45%;
    color: #fff;
    background-color: transparent;
    border: none;
    font-size: xx-large;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    left: 50px;
    z-index: 50;
}
#next {
    left: unset;
    right: 50px;
}
</style>
