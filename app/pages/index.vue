<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <!-- Seção Sobre este Projeto -->
        <div class="mb-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-50/50 to-white dark:from-primary-950/20 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
          <!-- Detalhe sutil de background -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
            <div class="p-3 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-xl shrink-0 w-fit">
              <UIcon name="i-lucide-graduation-cap" class="w-8 h-8" />
            </div>
            
            <div class="space-y-4">
              <div>
                <span class="text-xs font-semibold tracking-wider text-primary-600 dark:text-primary-400 uppercase">Estudo & Portfólio</span>
                <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mt-1">
                  Sobre este Projeto
                </h1>
              </div>
              
              <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                Este aplicativo foi desenvolvido como parte prática do 
                <a href="https://cursovuejs.com.br" target="_blank" rel="noopener" class="text-primary-600 dark:text-primary-400 font-semibold hover:underline inline-flex items-center gap-1">
                  Curso Vue.js Expert <UIcon name="i-lucide-external-link" class="w-3.5 h-3.5" />
                </a>. O objetivo principal é demonstrar a integração e o uso prático de tecnologias modernas do ecossistema Vue.
              </p>

              <!-- Grid de tecnologias estudadas no projeto -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div class="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
                  <UIcon name="i-lucide-code-2" class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 class="font-medium text-sm text-neutral-800 dark:text-neutral-200">Nuxt 4</h3>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400">Estrutura de diretórios avançada e alta performance</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
                  <UIcon name="i-lucide-layout" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 class="font-medium text-sm text-neutral-800 dark:text-neutral-200">Nuxt UI v4</h3>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400">Componentes acessíveis construídos com Tailwind CSS</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
                  <UIcon name="i-lucide-database" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 class="font-medium text-sm text-neutral-800 dark:text-neutral-200">Supabase</h3>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400">Autenticação, PostgreSQL e Tipagem TS automática</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
                  <UIcon name="i-lucide-globe" class="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 class="font-medium text-sm text-neutral-800 dark:text-neutral-200">Nuxt SEO</h3>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400">Gerenciamento completo de metadados e Sitemap</p>
                  </div>
                </div>
              </div>

              <div class="pt-2 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                <UIcon name="i-lucide-info" class="w-4 h-4 text-primary-500 shrink-0" />
                <span>Projeto de estudo desenvolvido para fins educacionais e para enriquecer meu portfólio profissional.</span>
              </div>
            </div>
          </div>
        </div>

        <UBlogPosts orientation="horizontal" :posts="posts ?? []" />
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">



const client = useSupabaseClient()
const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await client
    .from('post')
    .select('id, title, resume,  banner, created_at, category(name)')
    .order('created_at', { ascending: false })

  return data?.map((post) => ({
    title: post.title,
    description: post.resume ?? '',
    image: post.banner ? { src: post.banner, alt: post.title } : undefined,
    date: new Date(post.created_at).toLocaleString('pt-br', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    badge: post.category
      ? { label: (post.category as { name: string }).name }
      : undefined,
    to: `post-details/${post.id}`,
  }))
}
)

const meta = {
  title: ' MVP Nuxt + Supabase',
  description: 'Blog feito na aula do MVP Nuxt + Supabase',
}

useSeoMeta({
  title: meta.title,
  ogTitle: meta.title,
  twitterTitle: meta.title,
  description: meta.description,
  ogDescription: meta.description,
  twitterDescription: meta.description,
})

defineOgImage('BlogImage', {
  title: meta.title,
  description: meta.description,
})

</script>