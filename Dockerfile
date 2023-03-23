FROM node:19-alpine3.16
WORKDIR /usr/get-out
COPY package*.json ./
RUN npm install
COPY ./prisma prisma
RUN npx prisma generate
COPY . .
EXPOSE 3000
CMD ["npm","run","docker:dev"]




