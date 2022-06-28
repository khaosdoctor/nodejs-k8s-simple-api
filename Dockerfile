FROM node:18-alpine AS BUILDER

WORKDIR /app
COPY ["./package.json", "./package-lock.json", "/app/"]
RUN npm install

FROM node:18-alpine

WORKDIR /app

COPY --from=BUILDER ["/app/node_modules/", "/app/node_modules/"]
COPY ./src/ /app/src/
ENTRYPOINT [ "node", "./src/index.mjs" ]
