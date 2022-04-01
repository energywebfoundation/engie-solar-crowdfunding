# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build:fe

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN npm install -g http-server
RUN apk update && apk add bash

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 8080

ENV PORT 8080

WORKDIR /app/dist/apps/ew-crowdfunding/exported

CMD ["http-server", "./"]

