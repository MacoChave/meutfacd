FROM node:18-alpine as base 

FROM base as builder 

RUN apk --no-cache libc6-compat 
RUN apk update 
# Set working directory
WORKDIR /app
RUN pnpm i -g turbo 
COPY . . 
RUN turbo prune --scope=server --docker 
# Add Lockfile and package.json's of isolated subworkspace
FROM base as installer 
RUN apk add --no-cache libc6-compat
RUN apk update 
WORKDIR /app 

# Build the project and its dependencies
COPY --from=builder /app/out/full/ . 
COPY turbo.json turbo.json 

