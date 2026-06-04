<template>
    <USelect v-model="model" :items="items ?? []" cleareble :loading="pending" placeholder="Selecione uma categoria"
        class="w-full" />
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const toast = useToast()

const model = defineModel<number | undefined>()

const user = useSupabaseUser()

const { data: items, pending } = await useAsyncData('categories', async () => {
    const { data } = await client
        .from('category')
        .select('id, name')
        .eq('user_id', user.value?.sub as string)
        .order('name')

    return data?.map(category => ({
        value: category.id,
        label: category.name
    })) ?? []
})


if (!items.value) {
    toast.add({
        title: 'Error',
        description: 'Não foi possível recuperar as categorias',
        icon: 'bx:error',
        color: 'error'
    })
}

</script>