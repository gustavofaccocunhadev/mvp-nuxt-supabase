<template>
  <UPage>
    <div class="space-y-8 p-6 md:p-8 max-w-6xl mx-auto">
      <!-- Boas-vindas -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        <div>
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
            Olá, <span class="text-primary-600 dark:text-primary-400 capitalize">{{ userGreeting }}</span>!
          </h1>
          <p class="text-neutral-500 dark:text-neutral-400 mt-1">
            Aqui está o resumo da atividade no seu portfólio de artigos.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <UButton to="/app/post/form" icon="i-lucide-plus" size="md">
            Novo Artigo
          </UButton>
        </div>
      </div>

      <!-- Grid de Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Card de Artigos -->
        <div
          class="group p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden">
          <div
            class="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500/5 rounded-full blur-xl group-hover:bg-primary-500/10 transition-colors">
          </div>

          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total de Artigos</span>
            <div class="p-3 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 rounded-xl">
              <UIcon name="i-lucide-file-text" class="w-6 h-6" />
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {{ postsCount }}
            </h2>
            <p class="text-xs text-neutral-400 dark:text-neutral-500">
              Artigos criados e associados ao seu usuário.
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
            <UButton to="/app/post" variant="link" color="neutral" size="sm"
              class="px-0 font-medium hover:text-primary-600 dark:hover:text-primary-400">
              Gerenciar artigos
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-1" />
            </UButton>
          </div>
        </div>

        <!-- Card de Categorias -->
        <div
          class="group p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden">
          <div
            class="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500/5 rounded-full blur-xl group-hover:bg-primary-500/10 transition-colors">
          </div>

          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total de Categorias</span>
            <div class="p-3 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 rounded-xl">
              <UIcon name="i-lucide-folder-open" class="w-6 h-6" />
            </div>
          </div>

          <div class="space-y-2">
            <h2 class="text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {{ categoriesCount }}
            </h2>
            <p class="text-xs text-neutral-400 dark:text-neutral-500">
              Categorias criadas para organizar seus artigos.
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
            <UButton to="/app/category" variant="link" color="neutral" size="sm"
              class="px-0 font-medium hover:text-primary-600 dark:hover:text-primary-400">
              Gerenciar categorias
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-1" />
            </UButton>
          </div>
        </div>

      </div>


    </div>
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app-layout'
})

const client = useSupabaseClient()
const user = useSupabaseUser()

// Formatar e-mail do usuário para exibir de forma simpática (ex: gustavo.cunha)
const userGreeting = computed(() => {
  if (!user.value?.email) return 'Usuário'
  return user.value.email.split('@')[0]
})

// Buscar quantidade de artigos do usuário logado
const { data: postsCount } = await useAsyncData('dashboard-posts-count', async () => {
  const { count } = await client
    .from('post')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.value?.sub as string)

  return count || 0
})

// Buscar quantidade de categorias do usuário logado
const { data: categoriesCount } = await useAsyncData('dashboard-categories-count', async () => {
  const { count } = await client
    .from('category')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.value?.sub as string)

  return count || 0
})
</script>