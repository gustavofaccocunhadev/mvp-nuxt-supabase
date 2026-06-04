<template>
    <div class="space-y-2">
        <img 
        v-if="model && !file"
        :src="model"
        alt="preview"
        class="w-full max-h-64 object-cover rounded-md border border-muted"
        />
  <UFileUpload 
  v-model="file"
  :accept="accept ?? 'image/*'" 
  :loading="uploading"
  label="Envie o banner do seu artigo"
  class="w-full min-h-48"
  />
</div>
</template>

<script setup lang="ts">

const props = defineProps<{
    bucket: string
    accept?: string
}>()

const model = defineModel<string | null>()
const client = useSupabaseClient()
const toast = useToast()

const file = ref<File | null> (null)
const uploading = ref(false);

watch(file, async (newFile) => {
    if (!newFile) return;
    
    uploading.value = true;

    const ext = newFile.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`

    const {error} = await client.storage
    .from(props.bucket)
    .upload(fileName, newFile, {upsert: true})

    if (error) {
        toast.add({
            title: 'Erro no upload',
            description: error.message,
            color: 'error',
            icon: 'bx:error',
        })
        file.value = null
        uploading.value = false
        return
    }
    const { data} = client.storage
    .from(props.bucket)
    .getPublicUrl(fileName)
    
    model.value = data.publicUrl
    uploading.value = false
    file.value = null

    toast.add({
        title: 'Upload realizado',
        description: 'Imagem enviada com sucesso',
        color: 'success',
        icon: 'bx:check',
    })
})

</script>