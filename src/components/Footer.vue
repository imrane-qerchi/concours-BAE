<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-[#742581] text-white py-8 px-6 w-full">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
      <!-- Logo à gauche -->
      <a href="/" class="flex-shrink-0">
        <img src="/logo-UMLP-white.png" alt="Accueil" class="h-20 w-auto" />
      </a>

      <!-- Bouton contact (mobile : en haut + bas marges) -->
      <div class="flex-shrink-0 order-1 lg:order-3 mt-6 mb-6 lg:mt-0 lg:mb-0">
        <a
          href="mailto:contact-success-road@univ-fcomte.fr"
          class="bg-white text-[#742581] text-xl px-6 py-3 rounded-xl hover:bg-gray-200 transition"
        >
          Contact
        </a>
      </div>

      <!-- Liens légaux -->
      <div class="text-sm text-center lg:text-left order-2 lg:order-2">
        <div class="flex gap-3 flex-wrap justify-center lg:justify-center mb-2">
          <RouterLink to="/mentions-legales" class="hover:underline">Mentions légales</RouterLink>
          <RouterLink to="/conditions-generales-d-utilisation" class="hover:underline"
            >CGU</RouterLink
          >
          <RouterLink to="/politique-de-confidentialite" class="hover:underline"
            >Politique de confidentialité</RouterLink
          >
        </div>
        <p class="mt-5 text-gray-300 text-center lg:text-center">
          © Université Marie et Louis Pasteur – 2025
        </p>
      </div>
    </div>
  </footer>
</template>
