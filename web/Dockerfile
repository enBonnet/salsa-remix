FROM node:20-alpine
WORKDIR /usr/server/app
COPY ./package.json ./
RUN npm install
COPY ./ .
RUN npm run build
ENV NODE_ENV=production
ENV STRAPI_API_URL="http://localhost:1337/api"
ENV STRAPI_URL="http://localhost:1337"
ENV USER_SESSION_SECRET=secret0
CMD ["npm", "run" ,"start"]