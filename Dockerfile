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

ARG NEXT_PUBLIC_UI_BASE_URL
ARG NEXT_PUBLIC_CHAIN_ID
ARG NEXT_PUBLIC_RPC_URL
ARG NEXT_PUBLIC_CACHE_SERVER
ARG NEXT_PUBLIC_ORG_NAMESPACE
ARG NEXT_PUBLIC_NETWORK_NAME
ARG NEXT_PUBLIC_CURRENCY_NAME
ARG NEXT_PUBLIC_CURRENCY_SYMBOL
ARG NEXT_PUBLIC_PATRON_ROLE
ARG NEXT_PUBLIC_PATRON_ROLE_VERSION
ARG NEXT_PUBLIC_TOKEN_LIMIT
ARG NEXT_PUBLIC_GLOBAL_TOKEN_LIMIT
ARG NEXT_PUBLIC_INTEREST_RATE
ARG NEXT_PUBLIC_BLOCK_EXPLORER_URL
ARG NEXT_PUBLIC_ACTIVATE_STAKING_DATE
ARG NEXT_PUBLIC_CLOSE_STAKING_DATE
ARG NEXT_PUBLIC_LOCK_STAKES_DATE
ARG NEXT_PUBLIC_RELEASE_REWARDS_DATE
ARG NEXT_PUBLIC_FULL_STOP_DATE

RUN npm run build:fe


FROM node:16-alpine
RUN apk update && apk add bash
RUN npm install -g http-server

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 8080

ENV PORT 8080

WORKDIR /app/dist/apps/ew-crowdfunding/exported

CMD ["http-server", "./"]

