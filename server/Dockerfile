FROM node:latest
WORKDIR /app/server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node","index.js"]