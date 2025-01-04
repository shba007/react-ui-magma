FROM node:lts-alpine AS builder

ARG VITE_BASE_URL

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV VITE_BASE_URL=$VITE_BASE_URL

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

# --production remove so that vite and its dependencies can build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:alpine AS runner

ARG VERSION
ARG BUILD_TIME

ENV NODE_ENV=production
ENV REACT_APP_VERSION=$VERSION

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080