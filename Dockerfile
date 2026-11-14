# Portal da escola em um contêiner só: o site e a API, com os dados em disco (volume /dados).
# Uso: veja docker-compose.yml e a seção «Docker» de docs/SERVIDOR.md.

FROM node:22-alpine AS compilar
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# O registro de provas (com os gabaritos) entra no servidor neste build; nunca no site.
RUN npm run build && npm run build:servidor

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production \
    PORTA=8080 \
    DADOS_DIR=/dados \
    SITE_DIR=/app/dist
COPY --from=compilar /app/dist ./dist
COPY --from=compilar /app/dist-servidor ./dist-servidor
RUN mkdir -p /dados && chown node:node /dados
USER node
VOLUME ["/dados"]
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:8080/ || exit 1
CMD ["node", "dist-servidor/servidor.mjs"]
