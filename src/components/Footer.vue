<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showFooter = ref(false)

const checkScroll = () => {
  const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
  showFooter.value = scrolledToBottom
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <footer class="bg-[#56205A] text-white py-8 px-6 w-full">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
      <!-- Logo accueil -->
      <a href="/" class="flex-shrink-0">
        <img src="/LOGO_UMLP.png" alt="Accueil" class="h-12 w-auto" />
      </a>

      <!-- Logos partenaires -->
      <div class="flex gap-4 flex-wrap justify-center">
        <a href="https://alumni.univ-fcomte.fr/fr" target="_blank">
          <img
            src="/LOGO_UMLP.png"
            alt="Réseau Alumni"
            class="h-10 w-auto opacity-80 hover:opacity-100 transition"
          />
        </a>
        <a href="https://ose.univ-fcomte.fr/" target="_blank">
          <img
            src="/LOGO_UMLP.png"
            alt="OSE"
            class="h-10 w-auto opacity-80 hover:opacity-100 transition"
          />
        </a>
        <a
          href="http://u-sports.univ-fcomte.fr/pages/fr/1.0-campus_sports_accueil-14451.html"
          target="_blank"
        >
          <img
            src="/LOGO_UMLP.png"
            alt="Campus Sport"
            class="h-10 w-auto opacity-80 hover:opacity-100 transition"
          />
        </a>
        <a href="https://www.univ-fcomte.fr/sante" target="_blank">
          <img
            src="/LOGO_UMLP.png"
            alt="SSE"
            class="h-10 w-auto opacity-80 hover:opacity-100 transition"
          />
        </a>
      </div>

      <!-- Liens légaux -->
      <div class="text-sm text-center space-y-1">
        <div class="flex gap-3 flex-wrap justify-center">
          <RouterLink to="/cgu" class="hover:underline">CGU</RouterLink>
          <RouterLink to="/reglement" class="hover:underline">Règlement</RouterLink>
          <RouterLink to="/mentions" class="hover:underline">Mentions légales</RouterLink>
          <RouterLink to="/confidentialite" class="hover:underline">
            Politique de confidentialité
          </RouterLink>
        </div>
        <p class="mt-2">
          Contact :
          <a href="mailto:alumni@univ-fcomte.fr" class="underline">alumni@univ-fcomte.fr</a>
        </p>
        <div class="flex justify-center gap-4 mt-2">
          <a href="#" class="hover:opacity-80">LinkedIn</a>
          <a href="#" class="hover:opacity-80">Instagram</a>
          <a href="#" class="hover:opacity-80">Facebook</a>
        </div>
        <p class="mt-4 text-gray-300">
          © Réseau Alumni de l'Université Marie et Louis Pasteur – 2025
        </p>
      </div>
    </div>
  </footer>
</template>
