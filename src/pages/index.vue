<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { pb } from '@/backend'

const prenom = ref('')
const nom = ref('')
const email = ref('')
const success = ref(false)
const error = ref('')

const handleSubmit = async () => {
  success.value = false
  error.value = ''

  const emailRegex = /^[a-zA-Z0-9._%+-]+@edu\.univ-fcomte\.fr$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Veuillez utiliser votre adresse e-mail universitaire (@edu.univ-fcomte.fr).'
    return
  }

  try {
    await pb.collection('participants').create({
      prenom: prenom.value,
      nom: nom.value,
      email: email.value
    })
    success.value = true
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
    class="min-h-screen w-full text-white py-12 px-4 bg-cover bg-center bg-no-repeat"
    style="background-image: url('/background.jpg')"
  >
    <!-- Étapes (titre général) -->
    <section class="max-w-4xl mx-auto p-6 mt-80 mb-2 z-10 relative">
      <h2 class="text-2xl font-bold text-[#3F1A0D] text-center mb-2">
        Inscris toi et tente de remporter l’un des Success Kit* mis en jeu !
      </h2>
      <p class="text-sm text-center text-[#3F1A0D]">
        * Séance de Coaching, Prévention Santé et Essentiels sportifs dans chaque Success Kit
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
      <section class="relative z-10 bg-white text-[#3F1A0D] rounded-2xl shadow-xl p-8">
        <!-- Titre principal -->
        <h2 class="text-2xl font-extrabold text-center text-[#076879] mb-2 uppercase">ÉTAPE N°2</h2>

        <!-- Sous-titre -->
        <p class="text-center text-[#3F1A0D] mb-6">
          Pour participer au tirage au sort,
          <span class="font-bold">remplis le formulaire</span>
          ci-dessous avec les informations demandées
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
            class="w-full bg-[#742581] text-white py-3 rounded-lg hover:bg-purple-800 transition font-bold uppercase"
          >
            Je m’inscris au tirage au sort
          </button>
        </form>

        <!-- Messages -->
        <p v-if="success" class="mt-4 text-green-600 text-center font-medium">
          ✅ Inscription validée ! Une confirmation de ta participation te sera adressée sur ton
          e-mail universitaire.
        </p>
        <p v-if="error" class="mt-4 text-red-600 text-center font-medium">⚠️ {{ error }}</p>
      </section>
    </div>
  </div>
</template>
