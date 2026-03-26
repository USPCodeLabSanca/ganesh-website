<h1>
  <img src="/ganesh/public/images/logo/ganesh-logo-coloured.png" width="32" align="absmiddle"> Site do Ganesh
</h1>

Este é o repositório do site do Ganesh, o grupo extracurricular focado em segurança da informação da USP São Carlos.

**Algumas funcionalidades:**
- **Painel Administrativo (CMS):** Interface dedicada (`/admin`) para gestão do site.
- **Gestão de Conteúdo:** Criação, edição e remoção de Artigos, Dicas, Atividades e Notícias.
- **Internacionalização (i18n) e Tradução:** Suporte nativo para múltiplos idiomas (Português e Inglês) através do sistema de rotas do Next.js e integração com a API do DeepL para traduções.
- **Controle de Acesso a Perfis:** Sistema de autenticação com cargos.
- **Gestão de Patrocinadores:** Sistema para adicionar parceiros por níveis de patrocínio (Gold, Silver, Bronze, Supporter).

### Tecnologias usadas

- Front/Backend: *Nextjs 15.2.1*
- Banco de Dados: *Postgres*
- ORM: *Prisma*
- DevOps: *Docker*
- Autenticação: *NextAuth V5 (Beta)*

### Como rodar para desenvolvimento?

Rode todos os passos a seguir no diretório `/ganesh`. 

#### Configuração Inicial

1. Duplique o arquivo `.env.example`, renomeie a cópia para `.env` e preencha as variáveis de ambiente necessárias.
2. Instale as dependências: `npm install`
3. Sincronize os schemas do projeto: `npx prisma generate`

#### Apenas na primeira vez (Setup do Banco)

4. Rode o backend com: `docker compose up -d`
5. Realize as migrations no Postgres com: `npx prisma migrate dev`
6. Popule o banco com os dados iniciais: `npx prisma db seed`
7. Encerre o backend com: `docker compose down`

#### Para rodar a aplicação

8. Rode o backend com: `docker compose up -d`
9. Acesse o projeto em: `http://localhost:3000`
   - **Painel Admin:** Entre na rota `/admin`
   - **Email:** `admin@example.com`
   - **Senha:** `password`
10. Para encerrar a execução: `docker compose down`

### Adicionando ou deletando usuários

Caso queira criar um usuário, altere o arquivo `/prisma/seed.ts` com o email e senha, e então rode `npx prisma db seed` na raiz do projeto.

Caso queira deletar um usuário, altere o arquivo /prisma/delete.sql com o email que queres deletar, e então rode `npm run delete` na raiz do projeto.

### Como rodar para produção?

O projeto possui um **action-runner** que realiza o deploy automaticamente no servidor de produção. Ele é configurado para, ao realizar um push na branch principal (master), realizar o deploy no servidor de produção.

O projeto está configurado para rodar em produção com docker compose. Ele é configurado para rodar na porta 3000, e usamos o **nginx** para fazer o **proxy reverso**. Os comandos úteis na produção são:

- `docker compose -f docker-compose.prod.yaml build` para buildar o projeto (ele criará uma imagem nova do projeto). Tome cuidado pois ele não deleta a imagem antiga, então você terá que deletar manualmente.
- `docker compose -f docker-compose.prod.yaml up -d` para rodar o projeto em produção.
- `docker compose -f docker-compose.prod.yaml down` para terminar o projeto.

### Alguns prints de tela

![image](https://github.com/user-attachments/assets/716faa2a-e72d-47f2-8e82-a6089babc849)
![image](https://github.com/user-attachments/assets/9ff10f76-7b14-4a6b-af40-1783f023bbc3)

### TBD

- [ ] Adicionar info sobre frentes
- [ ] Adicionar info sobre projetos
- [ ] Adicionar faq
- [ ] Implementar vídeos