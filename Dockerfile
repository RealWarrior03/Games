# Einfaches Development-Image
FROM node:20-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Quellcode kopieren
COPY . .

# Port freigeben (falls Nuxt auf 3000 läuft)
EXPOSE 3000

# Development-Server starten
CMD ["pnpm", "run", "dev"]
