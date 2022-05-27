FROM golang:1.18-alpine

RUN apk add make gcc musl-dev

WORKDIR ahmedmkamal

COPY . .

RUN make build

RUN find . -name "*.go" -type f -delete

CMD ["./bin/ahmedmkamal.gexe"]
