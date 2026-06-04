# 🚀 MVP Blog - Nuxt 4 + Supabase

Este é um projeto de estudo moderno desenvolvido como parte prática do **Curso Vue.js Expert** ([cursovuejs.com.br](https://cursovuejs.com.br)). Trata-se de um sistema de blog completo (MVP) com área pública de leitura e uma área administrativa (Dashboard) privada.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza o que há de mais moderno no ecossistema web atual:

- **[Nuxt 4](https://nuxt.com/)** - Framework Vue de alta performance com a nova estrutura de pastas.
- **[Nuxt UI v4](https://ui.nuxt.com/)** - Componentes visuais modernos e acessíveis integrados com **Tailwind CSS**.
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service responsável pelo banco de dados PostgreSQL, autenticação e geração dinâmica de tipos TypeScript.
- **[Nuxt SEO](https://nuxtseo.com/)** - Otimização completa para indexação em mecanismos de busca e compartilhamento social.

---

## ✨ Funcionalidades do Projeto

### 🌐 Área Pública (Leitor)

- Listagem de artigos.
- Filtro de categorias associadas a cada artigo.
- Leitura de artigos individuais com boa formatação tipográfica.

### 🔒 Área Administrativa (Dashboard Privado)

- Tela de login e cadastro protegida integrada ao Supabase Auth.
- **Painel Inicial (Dashboard)**: Métricas que mostram a quantidade total de artigos e categorias criados pelo usuário logado.
- **Multi-tenant**: Cada usuário gerencia e visualiza exclusivamente os seus próprios artigos e categorias.
- Formulários de criação, edição e exclusão de posts e categorias.

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as chaves do seu projeto no Supabase:

```env
SUPABASE_URL="sua-url-do-supabase"
SUPABASE_KEY="sua-chave-anonima-publica"
SUPABASE_PROJECT_ID="id-do-projeto"
```

### 3. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`.

---

Este projeto foi construído para fins educacionais e de demonstração prática para composição de portfólio.
