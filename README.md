# PDM Tutorial 06 — APIs (React Native + Expo)

Este projeto demonstra como acessar APIs em uma aplicação React Native (usando Expo) e como organizar o código separando o modelo (`model/entities`) do serviço de acesso a dados (`model/services`). O projeto tem propósito educacional e será publicado no GitHub na organização `Gabio-Edu`, no repositório `pdm-tutorial06-apis`.

## Visão Geral
- Acesso a API REST usando `axios`.
- Separação entre camada de modelo (tipos/entidades) e camada de serviço (requisições HTTP).
- Exemplo de listagem de posts consumindo a API pública JSONPlaceholder.

## Estrutura do Projeto
```
/ (raiz)
├── App.tsx
├── components/
│   ├── PostList.tsx
│   ├── PostListAxios.tsx
│   └── PostListRefactor.tsx
├── model/
│   ├── entities/
│   │   └── post.ts
│   └── services/
│       └── postService.ts
├── package.json
└── tsconfig.json
```

### Model (Entidades)
Arquivo: `model/entities/post.ts`
```ts
export default interface Post {
  id: number;
  title: string;
  body: string;
}
```

### Service (Acesso à API)
Arquivo: `model/services/postService.ts`
```ts
import axios from 'axios';
import Post from '../entities/post';

export default class PostService {
  static BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

  async getPosts(): Promise<Post[]> {
    const response = await axios.get<Post[]>(PostService.BASE_URL);
    return response.data;
  }
}
```
- `BASE_URL` define o endpoint da API.
- `getPosts()` retorna uma `Promise<Post[]>` com os dados tipados.

## API Utilizada
- JSONPlaceholder: https://jsonplaceholder.typicode.com/
- Endpoint de exemplo: `https://jsonplaceholder.typicode.com/posts`
- Você pode trocar `BASE_URL` para apontar para outra API conforme necessário.

## Pré-requisitos
- Node.js LTS (recomendado)
- npm ou yarn
- Expo (pode usar via `npx expo` sem instalação global)

## Instalação e Execução
1. Clone o repositório:
   ```bash
   git clone https://github.com/Gabio-Edu/pdm-tutorial06-apis.git
   cd pdm-tutorial06-apis
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```
3. Inicie o app com Expo:
   ```bash
   npm run start
   # ou
   npx expo start
   ```
4. Abra em um dispositivo/emulador:
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## Como funciona
- `App.tsx` utiliza os componentes de lista de posts.
- Os componentes chamam o `PostService` para buscar os dados.
- O modelo `Post` garante tipagem consistente na aplicação.

Exemplo de uso do serviço:
```ts
const service = new PostService();
const posts = await service.getPosts();
```

## Personalização
- Altere `PostService.BASE_URL` para apontar para sua API.
- Adicione novos métodos no `PostService`, por exemplo:
  - `getPost(id: number)`
  - `createPost(post: Partial<Post>)`
  - `updatePost(id: number, post: Partial<Post>)`
  - `deletePost(id: number)`

## Propósito
Este repositório é voltado para fins educacionais e demonstra boas práticas básicas de organização de código (separação por camadas) e consumo de APIs em projetos React Native com TypeScript.

## Repositório
- Organização: `Gabio-Edu`
- Nome do repositório: `pdm-tutorial06-apis`
- URL esperada: `https://github.com/Gabio-Edu/pdm-tutorial06-apis`