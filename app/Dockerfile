FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.19.0 --activate

ENV npm_config_store_dir=/root/.local/share/pnpm/store

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]
