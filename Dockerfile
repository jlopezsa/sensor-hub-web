# Etapa base: define una imagen ligera de Node y habilita pnpm mediante Corepack.
# base: prepara Node sobre Alpine, define /app como directorio de trabajo y habilita pnpm con corepack
FROM node:22-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.15.9 --activate

# Etapa de dependencias: copia solo los manifiestos para maximizar el cache de Docker.
# deps: copia solo package.json y pnpm-lock.yaml para instalar dependencias. Eso mejora el cache: si no cambian
# dependencias, Docker no reinstala.
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Etapa de build: reutiliza node_modules de la etapa anterior y compila la app.
# builder: copia el código fuente completo y ejecuta pnpm build para generar la app de Next
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Etapa final: imagen mínima para ejecución en producción.
# runner: crea la imagen final de producción, mucho más limpia, copiando solo public, .next/static y .next/
# standalone.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Escucha en todas las interfaces dentro del contenedor.
ENV HOSTNAME=0.0.0.0
# Puerto interno expuesto por Next.js.
ENV PORT=3000

# Copia los archivos mínimos que genera Next en modo standalone.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Inicia el servidor standalone generado por Next.js.
CMD ["node", "server.js"]
