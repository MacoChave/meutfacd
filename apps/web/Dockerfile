FROM node:20 as base 
ENV PNPM_HOME="/pnpm" 
ENV PATH="$PNPM_HOME:$PATH" 
RUN corepack enable 

WORKDIR /pre
COPY . . 

FROM base AS prod-deps 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod 

FROM base AS build 

ARG TURL=http://localhost:5000
ENV VITE_API_URL="$TURL"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install 
RUN pnpm run build 

FROM nginx:alpine

ADD ./config/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /pre/dist /var/www/app/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]