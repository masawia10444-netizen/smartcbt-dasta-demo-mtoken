FROM node:18.17.1-alpine as build

WORKDIR /app

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384

COPY . /app

RUN npm install -g pnpm && \
    pnpm i && \
    pnpm run build

# Final stage
FROM node:18.17.1-alpine
WORKDIR /app
COPY --from=build /app /app

RUN npm install -g pnpm

EXPOSE 3000

CMD ["pnpm", "start"]