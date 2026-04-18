FROM nginx:alpine
COPY ./proyecto /usr/share/nginx/html
EXPOSE 80