FROM node:20 as base 
ENV PNPM_HOME = "/pnpm"
ENV PATH = "$PNPM_HOME:$PATH"
RUN corepack enable 

WORKDIR /app 
COPY . . 

FROM base AS prod-deps 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod 

FROM base AS build 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install 
RUN pnpm run build 

FROM node:20-alpine
WORKDIR /app 

ARG TBUILD=development
ENV NODE_ENV="$TBUILD"

COPY --from=prod-deps /app/node_modules ./node_modules 
COPY --from=build /app/dist ./
COPY --from=base /app/src/storage ./src/storage
COPY --from=base /app/src/utils/*.ttf ./src/utils

EXPOSE 8000
CMD [ "node", "src/app.js" ] 