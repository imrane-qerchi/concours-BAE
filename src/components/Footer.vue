<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-[#742581] text-white py-8 px-6 w-full">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
      <!-- Logo accueil -->
      <a href="/" class="flex-shrink-0">
        <img src="/logo-UMLP-white.png" alt="Accueil" class="h-20 w-auto" />
      </a>


      <!-- Liens légaux -->
      <div class="text-sm text-center space-y-1">
        <div class="flex gap-3 flex-wrap justify-center">
          <RouterLink to="/mentions-legales" class="hover:underline">Mentions légales</RouterLink>
          <RouterLink to="/conditions-generales-d-utilisation" class="hover:underline"
            >CGU</RouterLink
          >
          <RouterLink to="/politique-de-confidentialite" class="hover:underline">
            Politique de confidentialité
          </RouterLink>
        </div>
        <p class="mt-5 font-bold">
          Contact :
          <a href="mailto:contact-success-road@univ-fcomte.fr">contact-success-road@univ-fcomte.fr</a>
        </p>

        <p class="mt-5 text-gray-300">© Université Marie et Louis Pasteur – 2025</p>
      </div>
    </div>
  </footer>
</template>
