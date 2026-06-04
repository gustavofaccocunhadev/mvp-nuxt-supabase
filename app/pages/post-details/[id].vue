<template>
    <UContainer>
        <UPage>
            <UPageCTA :title="post.title" :description="post.resume" orientation="horizontal" variant="naked"
                :ui="{ container: 'lg:p-4' }">
                <img :src="post.banner" width="320" height="364" alt="Illustration" class="w-full rounded-lg"
                    loading="lazy" />

            </UPageCTA>
            <UBadge>
                {{ post.category.name }}
            </UBadge>
            <UPageBody>
                <div class="prose dark:prose-invert max-w-none" v-html="post.content"></div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const postId = computed(() => route.params.id ? Number(route.params.id) : undefined)
const toast = useToast()
const post = ref()
const client = useSupabaseClient()


if (postId.value) {
    const { data, error } = await client
        .from('post')
        .select('id, title, resume, banner, content, category(name)')
        .eq('id', postId.value)
        .single()

    if (error) {
        toast.add({
            title: 'Error',
            description: error.message,
            icon: 'bx:error',
            color: 'error'
        })
        navigateTo('/')
    } else {
        post.value = data
    }
}

useSeoMeta({
    title: post.value.title || '',
    description: post.value.resume || '',
    ogTitle: post.value.title || '',
    ogDescription: post.value.resume || '',
    ogImage: post.value.banner || '',
    twitterCard: 'summary_large_image',
    twitterTitle: post.value.title || '',
    twitterDescription: post.value.resume || '',
    twitterImage: post.value.banner || ''
})

</script>