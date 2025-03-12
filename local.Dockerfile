FROM node:20.18-slim As dev

WORKDIR /usr/hvcd-app/

COPY package*.json ./

RUN apt update && apt install -y procps && rm -rf /var/lib/apt/lists/*

RUN npm ci

COPY . .

FROM node:20.18-slim As build

WORKDIR /usr/hvcd-app/

ENV NODE_ENV production

COPY --from=dev /usr/hvcd-app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --omit=dev && npm cache clean --force

USER node

FROM node:20.18-slim As prod

WORKDIR /usr/hvcd-app/

COPY --from=dev /usr/hvcd-app/package.json ./package.json
COPY --from=build /usr/hvcd-app/node_modules ./node_modules
COPY --from=build /usr/hvcd-app/dist ./dist

USER node

# Run doesn't allow to put the node app in the container in the background and release my terminal session
# RUN npm run start:prod

# Start the server using the production build
CMD ["npm", "run", "start:prod"]




