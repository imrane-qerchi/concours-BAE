<script setup lang="ts">
import { RouterView } from 'vue-router/auto'
</script>

<template>
  <main class="flex-1">
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" :key="$route.path" />
      </Suspense>
    </RouterView>
  </main>
</template>
