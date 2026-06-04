<script setup lang="ts">
const user = useSupabaseUser()

// Redireciona para a aplicação assim que o usuário estiver logado
watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/app')
  }
}, { immediate: true })
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center min-h-[60vh] py-12">
    <UPageCard class="w-full max-w-md text-center">
      <div class="flex flex-col items-center justify-center gap-4 py-6">
        <!-- Spinner animado se não estiver logado, Ícone de Sucesso se logado -->
        <UIcon 
          v-if="!user" 
          name="i-lucide-loader-2" 
          class="w-12 h-12 text-primary animate-spin" 
        />
        <UIcon 
          v-else 
          name="i-lucide-check-circle" 
          class="w-12 h-12 text-success" 
        />
        
        <h2 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {{ user ? 'Acesso confirmado!' : 'Confirmando autenticação...' }}
        </h2>
        
        <p class="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
          {{ user ? 'Redirecionando você para a aplicação...' : 'Aguarde um momento enquanto preparamos seu acesso.' }}
        </p>

        <!-- Botões de fallback ou navegação manual -->
        <div class="mt-2 w-full flex justify-center">
          <UButton
            v-if="user"
            to="/app"
            label="Ir para o Painel"
            icon="i-lucide-arrow-right"
            trailing
          />
          <UButton
            v-else
            to="/auth/login"
            variant="ghost"
            label="Voltar para o Login"
            icon="i-lucide-arrow-left"
          />
        </div>
      </div>
    </UPageCard>
  </UContainer>
</template>