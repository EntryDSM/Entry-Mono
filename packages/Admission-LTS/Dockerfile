FROM node:20.6-alpine AS builder

WORKDIR /app/Admission-LTS

RUN apk add --no-cache libc6-compat git curl unzip

ARG BRANCH
ENV BRANCH=${BRANCH}

RUN curl -L -o ../EntryDesignSystem.zip https://github.com/EntryDSM/Entry-Mono/archive/${BRANCH}.zip && \
    unzip ../EntryDesignSystem.zip -d ../ && \
    mv ../Entry-Mono-${BRANCH}/packages/EntryDesignSystem ../EntryDesignSystem

COPY . .

RUN yarn install --immutable
RUN yarn build

FROM nginx:alpine AS runner

RUN echo "\
server {\
    listen 3003;\
    location / {\
        root   /usr/share/nginx/html;\
        index  index.html index.html;\
        try_files \$uri \$uri/ /index.html =404;\
    }\
}" > /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3003

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
