# FROM node:20.6-alpine AS builder

# WORKDIR /app

# RUN apk add --no-cache libc6-compat

# COPY . ./

# RUN yarn install --immutable
# RUN yarn build

# FROM nginx:alpine AS runner

# RUN echo "\
# server {\
#     listen 3003;\
#     location / {\
#         root   /usr/share/nginx/html;\
#         index  index.html index.html;\
#         try_files \$uri \$uri/ /index.html =404;\
#     }\
# }" > /etc/nginx/conf.d/default.conf

# COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 3003

# # Nginx 시작
# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build the application
FROM node:20.6-alpine AS builder

# 모노레포의 루트 디렉토리로 이동
WORKDIR /app

# Linux 호환성 패키지 설치
RUN apk add --no-cache libc6-compat

# 루트의 package.json과 yarn.lock 파일을 복사
COPY ../../package.json ../../yarn.lock ./

# 모든 워크스페이스의 의존성을 설치
RUN yarn install --immutable

# 현재 패키지로 이동하여 소스 코드 복사
WORKDIR /app/packages/Admission-LTS
COPY . .

# 패키지 빌드
RUN yarn build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine AS runner

# Nginx 설정 변경
RUN echo "\
server {\
    listen 3003;\
    location / {\
        root   /usr/share/nginx/html;\
        index  index.html index.html;\
        try_files \$uri \$uri/ /index.html =404;\
    }\
}" > /etc/nginx/conf.d/default.conf

# 빌드된 파일을 Nginx의 기본 웹 루트로 복사
COPY --from=builder /app/packages/Admission-LTS/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 3003

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]

