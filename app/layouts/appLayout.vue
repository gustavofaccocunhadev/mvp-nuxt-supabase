<template>
  <UDashboardGroup>
    <AppSideBar />
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard">

          <template #right>
            <UTooltip text="Logout">
              <UButton variant="ghost" color="neutral" icon="i-lucide-log-out" aria-label="Logout"
                @click="showConfirmLogout = true" />
            </UTooltip>
          </template>
        </UDashboardNavbar>

      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>

    <UModal v-model:open="showConfirmLogout" title="Deseja realmente desconectar?" :ui="{ footer: 'justify-end' }">
      <template #footer>
        <UButton label="Cancelar" color="neutral" variant="outline" @click="showConfirmLogout = false" />
        <UButton label="Desconectar" color="neutral" @click="logout" />
      </template>
    </UModal>
  </UDashboardGroup>
</template>

<script setup lang="ts">
const showConfirmLogout = ref(false)
const supabase = useSupabaseClient()

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error logging out:', error.message)
  } else {
    navigateTo('/auth/login')
  }
}

</script>