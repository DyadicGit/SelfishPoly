FROM node:18.17
LABEL authors="DyadicG"

ENV PORT=3000
ENV REACT_APP_SERVER_PORT=$PORT
ENV NODE_ENV=production

WORKDIR /usr/src/
RUN mkdir -p /app
WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build
RUN mv -f packages/client/build packages/server/build

HEALTHCHECK --interval=30s --timeout=30s \
  CMD curl -f http://localhost:$PORT/health || exit 1

EXPOSE $PORT

CMD npm run serve

# docker build --network=host --tag poly-i:latest .
# docker run --name poly-c -p 3000:3000 --detach poly-i:latest
# docker run --name poly-c --network=host poly-i:latest
