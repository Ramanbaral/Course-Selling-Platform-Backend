FROM node:lts-iron

WORKDIR /usr/app 

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm 
RUN pnpm install 
RUN pnpm install bcrypt

COPY . .
RUN pnpm run build 
CMD [ "pnpm", "start"]
