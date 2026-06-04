<script setup lang="ts">

//import { user } from '#build/ui'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
definePageMeta({
    layout: 'app-layout'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const categoryId = computed(() => route.query.id ? Number(route.query.id) : undefined)
const toast = useToast()
const state = reactive({
    name: '',
})

if (categoryId.value) {
    const { data: category, error } = await client
        .from('category')
        .select()
        .eq('id', categoryId.value)
        .single()

    if (error) {
        toast.add({
            title: 'Error',
            description: error.message,
            icon: 'bx:error',
            color: 'error'
        })
        navigateTo('/app/category')
    } else if (category) {
        state.name = category.name
    }
}

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
    const errors = []
    if (!state.name) errors.push({ name: 'email', message: 'Required' })

    return errors
}


async function onSubmit(event: FormSubmitEvent<Schema>) {

    const isEdit = !!categoryId.value

    const { error } = isEdit
        ? await client.from('category').update({ name: state.name, }).eq('id', categoryId.value)
        : await client.from('category').insert({ name: state.name, user_id: user.value?.sub })

    if (error) {
        toast.add({
            title: 'Error',
            description: error.message,
            icon: 'bx:error',
            color: 'error'
        })
    } else {
        toast.add({
            title: 'Sucesso',
            description: 'Categoria criada com sucesso.',
            icon: 'bx:check',
            color: 'success'
        })
        navigateTo('/app/category')
    }

}
</script>

<template>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Nome da categoria" name="name">
            <UInput v-model="state.name" />
        </UFormField>


        <div class="flex gap-2">
            <UButton to="/app/category" variant="outline">
                Cancelar
            </UButton>
            <UButton type="submit">
                {{ categoryId ? 'Atualizar' : 'Cadastrar' }}
            </UButton>
        </div>
    </UForm>
</template>
