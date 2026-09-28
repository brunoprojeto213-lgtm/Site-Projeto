# Publicar o Carrinho Concept3 no GitHub Pages

Este projeto é React + Vite + TypeScript. O GitHub Pages hospeda apenas o frontend compilado; ele não executa o servidor Express.

## 1. Corrigir as imagens

O ZIP não contém as três pranchas. Atualmente elas são referenciadas por URLs privadas do Manus:

```text
/manus-storage/carrinho-prancha-1_49616422.png
/manus-storage/carrinho-prancha-2_51dcda06.png
/manus-storage/carrinho-prancha-3_24eace73.png
```

Crie esta pasta e coloque nela os arquivos PNG:

```text
client/public/images/carrinho-prancha-1.png
client/public/images/carrinho-prancha-2.png
client/public/images/carrinho-prancha-3.png
```

Depois, em `client/src/pages/Home.tsx`, troque as referências por uma função que respeita o caminho do repositório:

```tsx
const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const plates = [
  {
    image: asset("carrinho-prancha-1.png"),
    // ...
  },
  {
    image: asset("carrinho-prancha-2.png"),
    // ...
  },
  {
    image: asset("carrinho-prancha-3.png"),
    // ...
  },
];
```

Também troque o `src` da imagem principal:

```tsx
<img
  src={asset("carrinho-prancha-1.png")}
  alt="Vista explodida do Carrinho Concept3"
/>
```

## 2. Corrigir o caminho do GitHub Pages

No início de `vite.config.ts`, antes do `defineConfig`, adicione:

```ts
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const siteBase = repositoryName ? `/${repositoryName}/` : "/";
```

Dentro do objeto passado a `defineConfig`, adicione:

```ts
base: siteBase,
```

Assim, se o repositório for `carrinho-concept3`, o site usará:

```text
https://SEU_USUARIO.github.io/carrinho-concept3/
```

Se o repositório for exatamente `SEU_USUARIO.github.io`, use `base: "/"`.

## 3. Remover o script de analytics quebrado

Em `client/index.html`, remova esta linha, pois as variáveis não existem no GitHub Actions:

```html
<script defer src="%VITE_ANALYTICS_ENDPOINT%/umami" data-website-id="%VITE_ANALYTICS_WEBSITE_ID%"></script>
```

## 4. Criar o workflow de publicação

Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Baixar código
        uses: actions/checkout@v4

      - name: Configurar Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Configurar pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10.4.1

      - name: Instalar dependências
        run: pnpm install --frozen-lockfile

      - name: Compilar frontend
        run: pnpm exec vite build

      - name: Preparar artefato do Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Publicar
        id: deployment
        uses: actions/deploy-pages@v4
```

## 5. Subir para o GitHub

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Preparar site para GitHub Pages"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/carrinho-concept3.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu usuário. Se o repositório já existir e já tiver um remote, não repita `git remote add origin`.

## 6. Ativar o Pages

No GitHub:

1. Abra o repositório.
2. Vá em **Settings > Pages**.
3. Em **Build and deployment > Source**, escolha **GitHub Actions**.
4. Vá em **Actions** e aguarde o workflow terminar.
5. Abra a URL exibida no job `deploy`.

## Observações importantes

- Não publique a pasta `dist` gerada localmente como se fosse a fonte; o workflow compila o projeto automaticamente.
- O `server/index.ts` não é necessário no GitHub Pages. Ele pode continuar no repositório, mas não será executado.
- Se o projeto futuramente precisar de login, API, banco de dados ou upload, GitHub Pages não será suficiente; será necessário hospedar o backend separadamente.
- O build original foi testado e concluiu com sucesso, mas gerou avisos porque o analytics estava sem variáveis e porque as imagens dependiam do `/manus-storage`.
