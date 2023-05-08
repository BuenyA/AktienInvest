# Basisimage
FROM node:lts-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /usr/src/app

# Abhängigkeiten installieren
COPY package*.json ./

RUN npm install

# Angular CLI installieren
RUN npm install -g @angular/cli

COPY . .

RUN npm run build --prod

# Produktions-Image erstellen
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/aktien_invest /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD nginx -g "daemon off;"