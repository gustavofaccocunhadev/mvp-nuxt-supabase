<script setup lang="ts">

//import { user } from '#build/ui'
import type { FormError, FormSubmitEvent, EditorToolbarItem } from '@nuxt/ui'
definePageMeta({
    layout: 'app-layout'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const postId = computed(() => route.query.id ? Number(route.query.id) : undefined)
const toast = useToast()
const state = reactive({
    title: '',
    resume:'',
    content: '',
    category_id: undefined as number | undefined,
    banner: null as string | null,
    
})

if (postId.value) {
    const { data, error } = await client
        .from('post')
        .select('id, title, resume, banner, content, category_id')
        .eq('id', postId.value)
        .single()

    if (error) {
        toast.add({
            title: 'Error',
            description: error.message,
            icon: 'bx:error',
            color: 'error'
        })
        navigateTo('/app/post')
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        state.title = data.title || '',
            state.content = data.content || '',
            state.category_id = data.category_id || undefined,
            state.banner = data.banner || null,
            state.resume = data.resume || ''
    }
}

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
    const errors = []
    if (!state.title) errors.push({ name: 'title', message: 'Required' })
    if (!state.resume) errors.push({ name: 'resume', message: 'Required' })
    if (!state.category_id) errors.push({ name: 'category_id', message: 'Required' })
    return errors
}

const items: EditorToolbarItem[][] = [
    [
        {
            icon: 'i-lucide-heading',
            tooltip: { text: 'Headings' },
            content: {
                align: 'start'
            },
            items: [
                {
                    kind: 'heading',
                    level: 1,
                    icon: 'i-lucide-heading-1',
                    label: 'Heading 1'
                },
                {
                    kind: 'heading',
                    level: 2,
                    icon: 'i-lucide-heading-2',
                    label: 'Heading 2'
                },
                {
                    kind: 'heading',
                    level: 3,
                    icon: 'i-lucide-heading-3',
                    label: 'Heading 3'
                },
                {
                    kind: 'heading',
                    level: 4,
                    icon: 'i-lucide-heading-4',
                    label: 'Heading 4'
                }
            ]
        }
    ],
    [
        {
            kind: 'mark',
            mark: 'bold',
            icon: 'i-lucide-bold',
            tooltip: { text: 'Bold' }
        },
        {
            kind: 'mark',
            mark: 'italic',
            icon: 'i-lucide-italic',
            tooltip: { text: 'Italic' }
        },
        {
            kind: 'mark',
            mark: 'underline',
            icon: 'i-lucide-underline',
            tooltip: { text: 'Underline' }
        },
        {
            kind: 'mark',
            mark: 'strike',
            icon: 'i-lucide-strikethrough',
            tooltip: { text: 'Strikethrough' }
        },
        {
            kind: 'mark',
            mark: 'code',
            icon: 'i-lucide-code',
            tooltip: { text: 'Code' }
        }
    ]
]

async function onSubmit(event: FormSubmitEvent<Schema>) {

    const isEdit = !!postId.value

    const { error } = isEdit
        ? await client.from('post').update({ 
            title: state.title, 
            resume: state.resume,
            banner: state.banner,
            content: state.content, 
            category_id: state.category_id as number,      
        }).eq('id', postId.value)
        : await client.from('post')
            .insert({
                title: state.title,
                resume: state.resume,
                banner: state.banner,
                content: state.content,
                category_id: state.category_id as number,
                user_id: user.value?.sub as string
            })

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
            description: `Artigo ${postId.value ? 'atualizado' : 'cadastrado'} com sucesso.`,

            icon: 'bx:check',
            color: 'success'
        })
        navigateTo('/app/post')
    }

}
</script>

<template>



    <UForm :validate="validate" :state="state" class="space-y-4 lg:min-w-lg min-w-full" @submit="onSubmit">
         <UFormField label="Banner" name="banner">
            <AppFileUpload v-model="state.banner" bucket="posts" />
         </UFormField>
        
        <UFormField label="Categoria" name="category_id">
            <AppCategorySelect v-model="state.category_id" />
        </UFormField>

        <UFormField label="Titulo do Artigo" name="title">
            <UInput v-model="state.title" class="w-full" />
        </UFormField>

        <UFormField label="Resumo do Artigo" name="resume">
            <UInput v-model="state.resume" class="w-full" />
        </UFormField>

        <UEditor v-slot="{ editor }" v-model="state.content" content-type="html"
            class="max-w-lg min-h-50 border border-muted">
            <UEditorToolbar :editor="editor" :items="items" layout="fixed" class="border border-muted" />
        </UEditor>

        <div class="flex gap-2">
            <UButton to="/app/post" variant="outline">
                Cancelar
            </UButton>
            <UButton type="submit">
                {{ postId ? 'Atualizar' : 'Cadastrar' }}
            </UButton>
        </div>
    </UForm>
</template>
