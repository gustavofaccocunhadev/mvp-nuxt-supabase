<script setup lang="ts">
import type {AuthFormField , FormSubmitEvent} from '@nuxt/ui'
const supabase = useSupabaseClient()
const toast = useToast()
const showForm = ref(true);

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Seu email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Sua senha',
  required: true
}, ]


const registerWithEmailAndPassword = async (payload: FormSubmitEvent<{ email: string; password: string }> ) => {
  const { error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`
    }
  })
  if (error) {  
    console.error('Error registering:', error.message)
      toast.add({
      title: 'Erro ao registrar',
      description: error.message,
      color: 'error',
    })
  } else{
    showForm.value = false;
  }
}


</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard v-if="showForm" class="w-full max-w-md">
      <UAuthForm
        title="Cadastre-se"
        description="Crie sua conta preenchendo os campos abaixo."
        icon="i-lucide-user-plus"
        :fields="fields"
        @submit="registerWithEmailAndPassword"
      >
    <template #description>
          Já possui uma conta? <ULink to="/auth/login" class="text-primary font-medium">Faça Login</ULink>.
        </template>
    </UAuthForm>
    </UPageCard>
    <UPageCard 
    v-else
    class="w-full max-w-md"
    title="Verifique sua caixa de email"
    description="Enviamos um link para você acessar a aplicação."
    />
  </div>
</template>