<template>
    <div>
        <div class="flex justify-end mb-4">
            <UButton to="/app/post/form">
                Criar Artigo
            </UButton>
        </div>
        <UTable :data="posts" empty="Nenhum artigo encontrado" :loading="pending" :ui="{ tr: 'cursor-pointer' }"
            class="flex-1" @select="editPost" />
    </div>
</template>

<script setup lang="ts">
import type { TableRow } from '@nuxt/ui'

definePageMeta({
    layout: 'app-layout'
})

const toast = useToast()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { data: posts, error, pending } = await useAsyncData('posts', async () => {
    const { data, } = await client.from('post')
    .select('id, title')
    .eq('user_id', user.value?.sub as string)

    return data! || []
})

if (error.value) {
    toast.add({
        title: 'Error',
        description: error.value.message,
        icon: 'bx:error',
        color: 'error'
    })
}

function editPost(_e: Event, row: TableRow<{ id: number, title: string }>) {
    navigateTo(`/app/post/form?id=${row.original.id}`)
}

</script>