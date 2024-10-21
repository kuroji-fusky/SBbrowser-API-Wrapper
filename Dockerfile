FROM node:20

WORKDIR /

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000
CMD ["yarn", "build", "--host", "0.0.0.0"]