FROM node:10 as build
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
COPY .flowconfig /app/
COPY .babelrc.js /app/
RUN yarn
COPY src/ /app/src/
RUN yarn build


FROM node:10
RUN apt-get update
RUN apt-get install -y pulseaudio-utils

RUN mkdir -p /app
WORKDIR /app
COPY --from=build /app/lib /app/lib/
COPY package.json /app
COPY yarn.lock /app/
ENV NODE_ENV=production
RUN yarn --prod
COPY sounds/ /app/sounds/
CMD [ "yarn", "start" ]
