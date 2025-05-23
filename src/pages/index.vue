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
    console.error('[PocketBase error]', err)

    let message = 'Une erreur est survenue lors de l’inscription. Veuillez réessayer.'

    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof (err as { response: unknown }).response === 'object' &&
      (err as { response: { data?: unknown } }).response?.data &&
      typeof (err as { response: { data?: unknown } }).response?.data === 'object'
    ) {
      const data = (err as { response: { data: Record<string, { message: string }> } }).response
        .data

      const emailError = data?.email?.message

      if (emailError?.toLowerCase().includes('unique')) {
        message = 'Cette adresse e-mail a déjà été utilisée pour participer au concours.'
      }
    }

    error.value = message
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
    <!-- Étapes -->
    <section class="max-w-3xl w-full mb-10 bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold text-purple-800 mb-4 text-center">
        Étapes avant de vous inscrire
      </h2>
      <ol class="list-decimal list-inside space-y-2 text-gray-800">
        <li>
          <strong>Activer votre compte</strong> sur le
          <a href="https://alumni.univ-fcomte.fr" target="_blank" class="text-purple-700 underline"
            >réseau Alumni</a
          >
          avec vos identifiants ENT.
        </li>
        <li>
          <strong>Connecter votre profil LinkedIn</strong> dans votre espace personnel sur le
          réseau.
        </li>
        <li>
          <strong>Revenir ici</strong> pour compléter le formulaire d’inscription au jeu concours.
        </li>
      </ol>
    </section>

    <!-- Formulaire -->
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-purple-800">
        Inscription au jeu concours BAE
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="prenom"
          type="text"
          placeholder="Prénom"
          required
          class="w-full border border-neutral-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          v-model="nom"
          type="text"
          placeholder="Nom"
          required
          class="w-full border border-neutral-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Adresse e-mail universitaire"
          required
          class="w-full border border-neutral-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          class="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
        >
          M'inscrire
        </button>
      </form>

      <p v-if="success" class="mt-4 text-green-600 text-center font-semibold">
        ✅ Inscription réussie !
      </p>
      <p v-if="error" class="mt-4 text-red-600 text-center font-semibold">⚠️ {{ error }}</p>
    </div>
  </div>
</template>
