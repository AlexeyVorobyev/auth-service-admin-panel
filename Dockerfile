# Stage 1: cache yarn packages
ARG NODE_IMAGE=node:latest
ARG NGINX_IMAGE=nginx:latest

FROM ${NODE_IMAGE} as yarn-cache-deps
WORKDIR /app/
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --ignore-engines

# Stage 2: build sources
FROM yarn-cache-deps as builder
WORKDIR /app/
COPY . ./
RUN yarn build

# Stage 3: run nginx:
FROM ${NGINX_IMAGE}
ENV NGINX_PORT 80
ENV NGINX_HOST localhost
RUN mkdir -p /opt/frontend
COPY --from=builder /app/opt/frontend /opt/frontend
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE ${NGINX_PORT}
ENTRYPOINT ["/bin/dash", "/opt/frontend/nginx-run.sh"]
