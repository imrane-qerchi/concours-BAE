<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-[#742581] text-white py-8 px-6 w-full">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
      <!-- Logo à gauche -->
      <a href="https://umlp.fr/" class="flex-shrink-0">
        <img src="/logo-UMLP-white.png" alt="Accueil" class="h-20 w-auto" />
      </a>

      <!-- Liens légaux -->
      <div class="text-sm text-center lg:text-left">
        <div class="flex gap-2 flex-wrap justify-center lg:justify-center mb-2">
          <RouterLink to="/mentions-legales" class="hover:underline">Mentions légales</RouterLink>
          <span>|</span>
          <a
            href="https://alumni.univ-fcomte.fr/fr/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >
            CGU
          </a>
          <span>|</span>
          <RouterLink to="/politique-de-confidentialite" class="hover:underline">
            Politique de confidentialité
          </RouterLink>
        </div>
        <p class="mt-5 text-gray-300 text-center lg:text-center">
          © Université Marie et Louis Pasteur – 2025
        </p>
      </div>
    </div>
  </footer>
</template>
