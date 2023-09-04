FROM docker.io/caddy:alpine

COPY ./out /website
COPY ./caddy/caddy.product.json /etc/caddy/caddy.json

VOLUME /etc/caddy

CMD ["caddy","run","--config","/etc/caddy/caddy.json"]
