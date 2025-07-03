# 1. Basis-Image
FROM node:20-alpine AS builder

# 2. Arbeitsverzeichnis setzen
WORKDIR /app

# 3. Abhängigkeiten kopieren und installieren
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 4. Quellcode kopieren
COPY . .

# 5. Build
RUN pnpm build

# 6. Production-Image
FROM node:20-alpine

WORKDIR /app

# Nur das Nötigste kopieren
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Startbefehl
CMD ["node", ".output/server/index.mjs"]
