FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat git curl unzip

ARG VITE_MAIN_URL
ARG VITE_AUTH_URL
ARG VITE_APPLY_URL
ARG VITE_ADMIN_URL
ARG VITE_SERVER_URL

ENV VITE_MAIN_URL=${VITE_MAIN_URL}
ENV VITE_AUTH_URL=${VITE_AUTH_URL}
ENV VITE_APPLY_URL=${VITE_APPLY_URL}
ENV VITE_ADMIN_URL=${VITE_ADMIN_URL}
ENV VITE_SERVER_URL=${VITE_SERVER_URL}

ARG BRANCH
ENV BRANCH=${BRANCH}

RUN curl -L -o ../Entry-Mono.zip https://github.com/EntryDSM/Entry-Mono/archive/${BRANCH}.zip && \
    unzip ../Entry-Mono.zip -d /

RUN corepack enable && corepack prepare yarn@4.4.0 --activate

WORKDIR /Entry-Mono-${BRANCH}
RUN yarn set version berry
RUN yarn install

WORKDIR /Entry-Mono-${BRANCH}/packages/Admission-LTS
RUN yarn build

# 실행 단계
FROM nginx:alpine AS runner

ARG BRANCH
ENV BRANCH=${BRANCH}

# Nginx 설정
RUN echo "\
server {\
    listen 3003;\
    location / {\
        root   /usr/share/nginx/html;\
        index  index.html index.html;\
        try_files \$uri \$uri/ /index.html =404;\
    }\
}" > /etc/nginx/conf.d/default.conf

COPY --from=builder /Entry-Mono-${BRANCH}/packages/Admission-LTS/build /usr/share/nginx/html

# 3000포트 열기
EXPOSE 3003
# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
