<script setup lang="ts">


</script>

<template>
  <UHeader>
    <template #title>
      <!-- <Logo class="h-6 w-auto" /> -->
      Gustavo Cunha
    </template>

    <UNavigationMenu />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="neutral" variant="ghost" to="/app" icon="i-lucide-log-in" aria-label="GitHub" />
      </UTooltip>
    </template>
  </UHeader>
</template>
