<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-[#56205A] text-white py-8 px-6 w-full">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
      <!-- Logo accueil -->
      <a href="/" class="flex-shrink-0">
        <img src="/logo-UMLP-white.png" alt="Accueil" class="h-20 w-auto" />
      </a>

      <div class="flex justify-center lg:gap-10 gap-6 my-5">
        <a
          href="https://www.linkedin.com/school/universite-de-franche-comte/"
          target="_blank"
          aria-label="LinkedIn"
          class="hover:opacity-80"
        >
          <img src="/linkedin.svg" alt="LinkedIn" class="h-15 w-15" />
        </a>
        <a
          href="https://www.instagram.com/fc_univ/"
          target="_blank"
          aria-label="Instagram"
          class="hover:opacity-80"
        >
          <img src="/instagram.svg" alt="Instagram" class="h-15 w-15" />
        </a>
        <a
          href="https://www.facebook.com/universiteFrancheComte/"
          target="_blank"
          aria-label="Facebook"
          class="hover:opacity-80"
        >
          <img src="/facebook.svg" alt="Facebook" class="h-15 w-15" />
        </a>
      </div>

      <!-- Liens légaux -->
      <div class="text-sm text-center space-y-1">
        <div class="flex gap-3 flex-wrap justify-center">
          <RouterLink to="/conditions-generales-d-utilisation" class="hover:underline"
            >CGU</RouterLink
          >
          <RouterLink to="/mentions-legales" class="hover:underline">Mentions légales</RouterLink>
          <RouterLink to="/politique-de-confidentialite" class="hover:underline">
            Politique de confidentialité
          </RouterLink>
        </div>
        <p class="mt-5">
          Contact :
          <a href="mailto:alumni@univ-fcomte.fr" class="underline">alumni@univ-fcomte.fr</a>
        </p>

        <p class="mt-5 text-gray-300">© Université Marie et Louis Pasteur – 2025</p>
      </div>
    </div>
  </footer>
</template>
