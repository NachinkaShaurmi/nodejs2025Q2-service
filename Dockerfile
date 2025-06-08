FROM node:22-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:22-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=builder /app/dist ./dist
COPY doc ./doc

EXPOSE ${PORT:-4000}

CMD ["npm", "run", "start:dev"]