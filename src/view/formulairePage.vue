<template>
    <div class="relative h-auto py-12 bg-gray-100">
        <div class="container mx-auto px-4">
            <div
                class="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                <!-- 📍 Carte -->
                <div
                    class="w-full lg:w-1/2 min-h-[600px] sm:min-h-[400px] lg:min-h-full relative"
                >
                    <Cartexpression v-model="position" />
                </div>

                <!-- 📝 Formulaire -->
                <div
                    class="w-full lg:w-1/2 bg-secondary px-6 sm:px-8 py-10 flex items-center"
                >
                    <form
                        @submit.prevent="handleSubmit"
                        class="w-full max-w-lg mx-auto space-y-6"
                    >
                        <!-- Titre -->
                        <div class="text-center">
                            <h2
                                class="text-3xl sm:text-5xl font-bold text-primary mb-2 font-poppins"
                            >
                                EXPRIMEZ-VOUS
                            </h2>
                            <p class="text-white text-sm">
                                Partagez votre expérience de façon anonyme et
                                sécurisée
                            </p>
                        </div>

                        <!-- Genre -->
                        <div>
                            <label
                                for="genre"
                                class="block mb-1 text-sm font-medium text-white"
                                >Vous êtes :</label
                            >
                            <select
                                id="genre"
                                name="genre"
                                v-model="genre"
                                class="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option disabled value="">
                                    Choisissez une option
                                </option>
                                <option value="homme">Homme</option>
                                <option value="femme">Femme</option>
                            </select>
                        </div>

                        <!-- Type -->
                        <div>
                            <label
                                for="feedbackType"
                                class="block mb-1 text-sm font-medium text-white"
                                >Que s'est-il passé ?</label
                            >
                            <select
                                id="feedbackType"
                                name="feedbackType"
                                v-model="feedbackType"
                                class="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option disabled value="">
                                    Choisissez un type de témoignage
                                </option>
                                <option value="avis">Avis</option>
                                <option value="suggestion">Suggestion</option>
                                <option value="experience">Expérience</option>
                            </select>
                        </div>

                        <!-- Lieu -->
                        <div>
                            <label
                                for="lieu"
                                class="block mb-1 text-sm font-medium text-white"
                            >
                                Sélectionnez le lieu sur la carte et indiquez
                                son nom ici
                            </label>
                            <input
                                type="text"
                                id="lieu"
                                name="lieu"
                                v-model="lieu"
                                placeholder="Nom du lieu"
                                class="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <!-- Message + actions -->
                        <div class="bg-white shadow rounded-lg p-4">
                            <label
                                for="message"
                                class="block text-sm font-medium text-gray-700 mb-2"
                                >Votre message :</label
                            >
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                v-model="message"
                                placeholder="À vous le clavier..."
                                class="w-full p-3 text-gray-800 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                            ></textarea>

                            <!-- Actions -->
                            <div
                                class="flex flex-wrap items-center justify-start gap-4 mt-4"
                            >
                                <!-- Image -->
                                <label
                                    for="file-upload"
                                    class="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-green-600"
                                >
                                    <i
                                        class="fas fa-image text-green-500 text-xl"
                                    ></i>
                                    <span class="hidden sm:inline">Image</span>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    @change="handleImageUpload"
                                />

                                <!-- Micro -->
                                <button
                                    type="button"
                                    @click="
                                        isRecording
                                            ? stopRecording()
                                            : startRecording()
                                    "
                                    class="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600"
                                >
                                    <i
                                        :class="[
                                            'text-xl',
                                            isRecording
                                                ? 'fas fa-stop text-red-700 animate-pulse'
                                                : 'fas fa-microphone text-red-500',
                                        ]"
                                    ></i>
                                    <span class="hidden sm:inline">{{
                                        isRecording ? "Stop" : "Audio"
                                    }}</span>
                                </button>

                                <!-- Durée -->
                                <span
                                    v-if="isRecording"
                                    class="text-sm text-red-600 font-semibold"
                                >
                                    {{ formattedDuration }}
                                </span>
                            </div>

                            <!-- Aperçu image -->
                            <div
                                v-if="imagePreview"
                                class="mt-4 relative inline-block"
                            >
                                <img
                                    :src="imagePreview"
                                    class="w-20 h-20 object-cover rounded-xl shadow border"
                                />
                                <button
                                    type="button"
                                    @click="removeImage"
                                    class="absolute -top-2 -right-2 bg-white border border-gray-300 text-gray-600 rounded-full p-1 shadow hover:bg-red-500 hover:text-white"
                                >
                                    <i class="fas fa-times text-xs"></i>
                                </button>
                            </div>

                            <!-- Aperçu audio -->
                            <div
                                v-if="audioBlob"
                                class="mt-4 flex items-center gap-3"
                            >
                                <audio
                                    :src="audioUrl"
                                    controls
                                    class="w-full rounded-lg shadow"
                                />
                                <button
                                    @click="clearAudio"
                                    type="button"
                                    class="text-red-600 hover:text-red-800"
                                    title="Supprimer l'audio"
                                >
                                    <i class="fas fa-times-circle text-xl"></i>
                                </button>
                            </div>

                            <!-- Infos taille -->
                            <p class="mt-3 text-xs text-gray-500">
                                Limites conseillées : image ≤ 5 Mo • audio ≤ 8
                                Mo (sinon erreur 413).
                            </p>
                        </div>

                        <!-- Confirmation -->
                        <div
                            v-if="successMessage"
                            class="text-green-500 text-sm text-center"
                        >
                            {{ successMessage }}
                        </div>

                        <!-- Erreur -->
                        <div
                            v-if="errorMessage"
                            class="text-red-200 text-sm text-center"
                        >
                            {{ errorMessage }}
                        </div>

                        <!-- Bouton -->
                        <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="w-full inline-block text-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {{ isSubmitting ? "ENVOI..." : "ENVOYER" }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Cartexpression from "@/components/cartexpression.vue";
import { buildApiUrl } from "@/config/api";

const router = useRouter();

const genre = ref("");
const feedbackType = ref("");
const lieu = ref("");
const message = ref("");

const position = ref({ lat: null, lng: null });

const successMessage = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);

// ✅ limites upload (pour éviter 413)
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_AUDIO_BYTES = 8 * 1024 * 1024; // 8MB

// Image
const imageFile = ref(null);
const imagePreview = ref(null);

const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_BYTES) {
        errorMessage.value = "❌ Image trop lourde (max 5 Mo).";
        e.target.value = "";
        return;
    }

    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
};

const removeImage = () => {
    imageFile.value = null;
    imagePreview.value = null;
};

// Audio
const isRecording = ref(false);
let mediaRecorder;
let chunks = [];
const audioBlob = ref(null);
const audioUrl = ref(null);
const duration = ref(0);
let timer = null;

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        mediaRecorder = new MediaRecorder(stream);
        chunks = [];
        duration.value = 0;

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/webm" });

            if (blob.size > MAX_AUDIO_BYTES) {
                audioBlob.value = null;
                audioUrl.value = null;
                errorMessage.value =
                    "❌ Audio trop lourd (max 8 Mo). Réduis la durée.";
            } else {
                audioBlob.value = blob;
                audioUrl.value = URL.createObjectURL(blob);
            }

            clearInterval(timer);
            stream.getTracks().forEach((t) => t.stop());
        };

        mediaRecorder.start();
        isRecording.value = true;
        timer = setInterval(() => duration.value++, 1000);
    } catch (err) {
        alert("Microphone inaccessible !");
        console.error(err);
    }
};

const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        isRecording.value = false;
    }
};

const formattedDuration = computed(() => {
    const min = Math.floor(duration.value / 60)
        .toString()
        .padStart(1, "0");
    const sec = (duration.value % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
});

const clearAudio = () => {
    audioBlob.value = null;
    audioUrl.value = null;
    duration.value = 0;
};

// Submit
const handleSubmit = async () => {
    successMessage.value = "";
    errorMessage.value = "";

    if (!genre.value || !feedbackType.value || !lieu.value || !message.value) {
        errorMessage.value =
            "❌ Veuillez remplir tous les champs obligatoires.";
        return;
    }

    if (position.value.lat == null || position.value.lng == null) {
        errorMessage.value = "❌ Veuillez sélectionner un point sur la carte.";
        return;
    }

    // ✅ second check tailles
    if (imageFile.value && imageFile.value.size > MAX_IMAGE_BYTES) {
        errorMessage.value = "❌ Image trop lourde (max 5 Mo).";
        return;
    }
    if (audioBlob.value && audioBlob.value.size > MAX_AUDIO_BYTES) {
        errorMessage.value = "❌ Audio trop lourd (max 8 Mo).";
        return;
    }

    const formData = new FormData();
    formData.append("genre", genre.value);
    formData.append("feedbackType", feedbackType.value);
    formData.append("lieu", lieu.value);
    formData.append("message", message.value);
    formData.append("latitude", String(position.value.lat));
    formData.append("longitude", String(position.value.lng));

    if (imageFile.value) formData.append("file", imageFile.value);
    if (audioBlob.value)
        formData.append("audio", audioBlob.value, "audio.webm");

    const url = buildApiUrl("submit.php");
    console.log("API submit URL =>", url);

    isSubmitting.value = true;

    try {
        const response = await fetch(url, { method: "POST", body: formData });

        // lire brut (pour capter HTML 413)
        const raw = await response.text();

        let result;
        try {
            result = JSON.parse(raw);
        } catch {
            console.error("Réponse non-JSON :", raw);
            if (response.status === 413) {
                throw new Error(
                    "413 Request Entity Too Large (fichier trop lourd)",
                );
            }
            throw new Error("Réponse serveur non-JSON (erreur nginx/PHP).");
        }

        if (response.ok) {
            successMessage.value =
                result?.message || "✅ Données envoyées avec succès !";
            setTimeout(() => {
                successMessage.value = "";
                router.push("/forumPage");
            }, 1200);
        } else {
            errorMessage.value = result?.message || "❌ Erreur serveur.";
        }
    } catch (error) {
        console.error("Erreur réseau :", error);

        if (String(error.message).includes("413")) {
            errorMessage.value =
                "❌ Fichier trop lourd : réduis l’image/l’audio (erreur 413).";
        } else {
            errorMessage.value = "❌ Erreur de connexion au serveur.";
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
</style>
