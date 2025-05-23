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
    class="min-h-screen w-full text-white py-12 px-4"
    style="background: linear-gradient(to bottom right, #ea017e, #771e82, #147461)"
  >
    <!-- Titre -->
    <section class="text-center mb-12">
      <h1
        class="text-5xl lg:text-6xl font-extrabold uppercase tracking-tight italic drop-shadow-md"
      >
        Bienvenue au concours BAE
      </h1>
      <p class="text-xl mt-2 text-yellow-200 font-medium">
        Septembre 2025 — Université Marie et Louis Pasteur
      </p>
    </section>

    <!-- Étapes -->
    <section class="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 mb-10">
      <h2 class="text-2xl font-semibold text-yellow-300 text-center mb-4">Étapes à suivre</h2>
      <ol class="list-decimal list-inside space-y-3 text-white text-lg font-light">
        <li>
          Activez votre compte sur
          <a href="https://alumni.univ-fcomte.fr" class="underline text-yellow-200" target="_blank"
            >le réseau Alumni</a
          > via vos identifiants ENT.
        </li>
        <li>
          Compléter votre profil via la
          <a
            href="https://alumni.univ-fcomte.fr/fr/article/tuto-alumni-completer-votre-profil-en-important-les-donnees-de-votre-compte-linkedin/19/02/2025/243"
            target="_blank"
            class="underline text-yellow-200"
          >
            fonctionnalité LinkedIn</a
          >.
        </li>

        <li>Remplissez le formulaire d’inscription ci-dessous.</li>
      </ol>
    </section>

    <!-- Formulaire -->
    <section class="max-w-xl mx-auto bg-white text-black rounded-2xl shadow-xl p-8">
      <h2 class="text-2xl font-bold text-center text-purple-800 mb-6 uppercase">
        Formulaire d'inscription
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="prenom"
          type="text"
          placeholder="Prénom"
          required
          class="w-full border border-neutral-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
        <input
          v-model="nom"
          type="text"
          placeholder="Nom"
          required
          class="w-full border border-neutral-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Adresse e-mail universitaire"
          required
          class="w-full border border-neutral-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          class="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition font-semibold"
        >
          M'inscrire
        </button>
      </form>

      <!-- Messages -->
      <p v-if="success" class="mt-4 text-green-600 text-center font-medium">
        ✅ Inscription réussie ! Bonne chance 🍀
      </p>
      <p v-if="error" class="mt-4 text-red-600 text-center font-medium">⚠️ {{ error }}</p>
    </section>
  </div>
</template>
