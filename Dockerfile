FROM docker.io/node:lts-bullseye-slim as builder

COPY ./ /src

WORKDIR /src

RUN npm install && npm run build-on-linux




FROM docker.io/node:lts-bullseye-slim as runner

COPY --from=builder /src/.next/standalone /app
COPY --from=builder /src/LICENSE /app/LICENSE

ENV NEXT_TELEMETRY_DISABLED=1
ENV ZEROTIER_ONE_ENDPOINT=http://localhost:9993
ENV ZEROTIER_ONE_AUTHTOKEN=aaaabbbbccccddddeeeeffff
ENV HOSTNAME=localhost
ENV PORT=9994

WORKDIR /app

CMD ["node","server.js"]
