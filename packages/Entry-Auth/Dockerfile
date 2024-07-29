FROM node:18.19-alpine AS builder

WORKDIR /app

COPY . ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "build"]