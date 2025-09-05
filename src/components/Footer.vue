<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-[#742581] text-white py-8 px-6 w-full">
    <div class="max-w-7xl mx-auto flex flex-col items-center gap-6">
      <!-- Logos centrés et cliquables -->
      <div class="flex flex-wrap justify-center gap-6">
        <a href="https://alumni.univ-fcomte.fr/fr" target="_blank" rel="noopener noreferrer">
          <img src="/alumni.png" alt="Alumni" class="h-22 w-auto hover:opacity-80 transition" />
        </a>
        <a
          href="http://u-sports.univ-fcomte.fr/pages/fr/1.0-campus_sports_accueil-14451.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/campus-sports.png"
            alt="Campus Sports"
            class="h-22 w-auto hover:opacity-80 transition"
          />
        </a>
        <a href="https://ose.univ-fcomte.fr/" target="_blank" rel="noopener noreferrer">
          <img src="/ose.png" alt="OSE" class="h-22 w-auto hover:opacity-80 transition" />
        </a>
        <a href="https://www.bienvenueauxetudiants.org/" target="_blank" rel="noopener noreferrer">
          <img src="/bae.png" alt="BAE" class="h-22 w-auto hover:opacity-80 transition" />
        </a>
        <a href="https://www.umlp.fr/sante" target="_blank" rel="noopener noreferrer">
          <img src="/sse.png" alt="SSE" class="h-22 w-auto hover:opacity-80 transition" />
        </a>
        <a href="https://larodia.com/" target="_blank" rel="noopener noreferrer">
          <img src="/larodia.png" alt="La Rodia" class="h-22 w-auto hover:opacity-80 transition" />
        </a>
        <a href="https://www.lemoloco.com/" target="_blank" rel="noopener noreferrer">
          <img src="/moloco.png" alt="Moloco" class="h-22 w-auto hover:opacity-80 transition" />
        </a>
      </div>

      <!-- Liens légaux -->
      <div class="text-sm text-center">
        <div class="flex gap-2 flex-wrap justify-center mb-2">
          <RouterLink to="/mentions-legales" target="_blank" class="hover:underline">
            Mentions légales
          </RouterLink>
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
          <RouterLink to="/politique-de-confidentialite" target="_blank" class="hover:underline">
            Politique de confidentialité
          </RouterLink>
        </div>
        <p class="mt-5 text-gray-300 text-center">© Université Marie et Louis Pasteur – 2025</p>
      </div>
    </div>
  </footer>
</template>
