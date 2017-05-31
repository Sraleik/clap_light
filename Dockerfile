FROM alpine:3.4
MAINTAINER Sraleik <sraleik@gmail.com>

RUN apk add --update nodejs && \
    rm -rf /var/cache/apk/*

COPY . /app
WORKDIR /app

RUN npm install

#COPY scripts/run.sh /scripts/run.sh

#COPY docker_test.sh /test/docker_test.sh

EXPOSE 8080

#ENTRYPOINT ["bash"]

CMD ["npm", "start" ]
