FROM gcr.io/distroless/nodejs20-debian12:nonroot

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/hvcd-app/

COPY ./package.json ./package.json
COPY ./node_modules ./node_modules
COPY ./dist ./dist

CMD ["./dist/main"]
