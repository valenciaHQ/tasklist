FROM node:alpine

ENV PORT 3000

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]