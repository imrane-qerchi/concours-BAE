<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { pb } from '@/backend'

const prenom = ref('')
const nom = ref('')
const email = ref('')
const success = ref(false)
const error = ref('')
const showPopup = ref(false)
const showTutorial = ref(false)

const handleSubmit = async () => {
  error.value = ''
  success.value = false

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(edu\.)?univ-fcomte\.fr$/
  if (!emailRegex.test(email.value)) {
    error.value =
      'Veuillez utiliser votre adresse e-mail universitaire (@edu.univ-fcomte.fr ou @univ-fcomte.fr).'
    return
  }

  try {
    await pb.collection('participants').create({
      prenom: prenom.value,
      nom: nom.value,
      email: email.value
    })

    success.value = true
    showPopup.value = true // ✅ Afficher le pop-up uniquement si l'inscription réussit

    prenom.value = ''
    nom.value = ''
    email.value = ''
  } catch (err: unknown) {
    let message = 'Une erreur est survenue lors de l’inscription. Veuillez réessayer.'
    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof (err as { response: unknown }).response === 'object'
    ) {
      const data = (err as { response: { data?: unknown } }).response?.data
      if (typeof data === 'object' && data && 'email' in data) {
        const emailMessage = (data as Record<string, { message: string }>).email?.message
        if (emailMessage?.toLowerCase().includes('unique')) {
          message = 'Cette adresse e-mail a déjà été utilisée pour participer au concours.'
        }
      }
    }
    error.value = message
  }
}
</script>

<template>
  <div
    class="min-h-screen w-full text-white py-12 px-4 bg-cover bg-center bg-no-repeat background-dynamic"
  >
    <!-- Étapes (titre général) -->
    <section class="max-w-4xl mx-auto p-6 mt-80 -mb-4 md:mb-2 z-10 relative">
      <h2 class="text-lg md:text-2xl font-bold text-[#3F1A0D] text-center mb-2">
        Inscris toi et tente de remporter l’un des Success Kit* mis en jeu !
      </h2>
      <p class="text-sm text-center text-[#3F1A0D]">
        * Séance de Coaching, Atelier prévention Santé, Pack sportif & une place pour un concert près de chez toi dans chaque Success Kit
      </p>
    </section>

    <!-- Formulaire + image panneau -->
    <div class="relative max-w-xl mx-auto mt-6">
      <!-- Image panneau décorative -->
      <img
        src="/panneau.png"
        alt="Panneau"
        class="absolute -top-122 left-1/2 -translate-x-1/2 z-0 w-80 pointer-events-none select-none"
      />

      <!-- Formulaire par-dessus -->
      <section class="relative z-10 bg-white text-[#3F1A0D] rounded-2xl shadow-xl p-8 mb-7">
        <!-- Titre principal -->
        <h2
          class="text-2xl font-[Lobster] font-extrabold text-center text-[#076879] mb-2 uppercase"
        >
          ÉTAPE N°2
        </h2>

        <!-- Sous-titre -->
        <p class="text-center text-[#3F1A0D] mb-6">
          Pour participer au tirage au sort,<br />
          <span class="font-bold">remplis le formulaire</span>
          ci-dessous.
        </p>

        <!-- Formulaire -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <input
            v-model="prenom"
            type="text"
            placeholder="Prénom"
            required
            class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742581]"
          />
          <input
            v-model="nom"
            type="text"
            placeholder="Nom"
            required
            class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742581]"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Adresse e-mail universitaire"
            required
            class="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742581]"
          />

          <button
            type="submit"
            class="w-full bg-[#742581] text-white py-3 rounded-lg hover:bg-[#D90D80] transition font-bold uppercase"
          >
            Je m’inscris au tirage au sort
          </button>
        </form>

        <!-- Messages -->
        <p v-if="error" class="mt-4 text-red-600 text-center font-medium">⚠️ {{ error }}</p>
      </section>

      <!-- Pop-up de confirmation -->
      <div
        v-if="showPopup"
        class="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-6 max-w-md text-center text-[#3F1A0D] shadow-2xl">
          <h3 class="text-2xl font-bold mb-2">🎉 Inscription validée !</h3>
          <p class="mb-4">
            Une confirmation de ta participation te sera adressée sur ton e-mail universitaire.
          </p>
          <button
            @click="showPopup = false"
            class="bg-[#742581] text-white px-6 py-2 rounded-lg hover:bg-[#D90D80] transition font-bold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Étapes (titre général) -->
    <section class="max-w-4xl mx-auto p-5">
      <p class="text-lg text-center text-[#3F1A0D] mb-5">
        📄 Consulte
        <a
          href="https://alumni.univ-fcomte.fr/medias/editor/oneshot-images/74440595568ad71bc32098.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="underline font-bold hover:text-[#742581] transition"
          >le règlement de participation</a
        >.
      </p>
      <h2 class="text-lg text-[#3F1A0D] text-center mb-6">
        <b>Prochaine et dernière étape</b> indispensable pour la bonne prise en compte de ta
        participation : n’oublie pas de <b>mettre à jour les informations de ton profil</b> sur
        <a
          href="https://alumni.univ-fcomte.fr/fr/profile/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline font-bold hover:text-[#742581] transition"
        >
          ton compte Alumni </a
        >.
      </h2>
      <p class="text-lg text-center text-[#3F1A0D]">
        Besoin d'aide ?<br />🎬 Consulte
        <button
          @click="showTutorial = true"
          class="underline font-bold hover:text-[#742581] transition"
        >
          notre tutoriel
        </button>
        ou
        <a
          href="mailto:contact-success-road@univ-fcomte.fr"
          target="_blank"
          rel="noopener noreferrer"
          class="underline font-bold hover:text-[#742581] transition"
          >contacte-nous</a
        >
        !
      </p>
    </section>

    <!-- Pop-up Tutoriel avec fond noir, croix externe et fermeture au clic extérieur -->
    <div
      v-if="showTutorial"
      @click.self="showTutorial = false"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
    >
      <!-- Bouton de fermeture externe -->
      <button
        @click="showTutorial = false"
        class="absolute top-7 right-7 text-white text-4xl font-bold hover:text-[#D90D80] z-50"
        aria-label="Fermer"
      >
        ✕
      </button>

      <!-- Cadre noir transparent autour de la vidéo -->
      <div class="relative rounded-lg" @click.stop>
        <!-- Conteneur de la vidéo -->
        <div class="relative bg-white max-w-3xl w-full rounded-lg shadow-2xl overflow-hidden">
          <!-- Vidéo locale -->
          <video controls autoplay class="w-full h-auto rounded-b-lg">
            <source src="/videos/tutoriel-alumni.mp4" type="video/mp4" />
            Ton navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>
