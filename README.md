This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Docker

Este `Dockerfile` usa un enfoque de `multi-stage build` para separar responsabilidades y dejar la imagen final de producción más pequeña y limpia.

Se divide en cuatro etapas:

- `base`: define la configuración común. Usa `node:22-alpine`, establece `/app` como directorio de trabajo y habilita `pnpm` con `corepack`.
- `deps`: instala dependencias copiando solo `package.json` y `pnpm-lock.yaml`. Esto mejora la caché de Docker, porque si el código cambia pero las dependencias no, esta capa se reutiliza.
- `builder`: copia el código fuente, reutiliza `node_modules` desde `deps` y ejecuta `pnpm build` para compilar la aplicación.
- `runner`: construye la imagen final de producción y copia solo los artefactos necesarios para ejecutar la app, sin arrastrar herramientas de build ni archivos innecesarios.

Flujo general:

```text
docker build
   |
   v
[base]
- usa node:22-alpine
- configura /app
- habilita pnpm
   |
   +--> [deps]
   |    - copia package.json y pnpm-lock.yaml
   |    - instala node_modules
   |
   +--> [builder]
   |    - reutiliza node_modules desde deps
   |    - copia el codigo fuente
   |    - ejecuta pnpm build
   |    - genera .next/standalone y .next/static
   |
   v
[runner]
- imagen final de producción
- copia solo artefactos necesarios desde builder
- expone puerto 3000
- arranca con node server.js
   |
   v
docker run
   |
   v
contenedor levantado con la app
```

## Docker Compose

### Build y Run

Para construir la imagen y levantar el contenedor:

```bash
docker compose -f docker-compose.yml up -d --build
```

### Stop

Para detener los contenedores sin eliminarlos:

```bash
docker compose -f docker-compose.yml stop
```

Para detener y eliminar el contenedor, la red y los recursos creados por Compose:

```bash
docker compose -f docker-compose.yml down
```

`stop` deja los contenedores creados para poder iniciarlos otra vez más rápido. `down` además elimina los contenedores y la red creada por Compose.
