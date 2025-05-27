<script setup lang="ts">
import { RouterView } from 'vue-router/auto'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" :key="$route.path" />
        </Suspense>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>
