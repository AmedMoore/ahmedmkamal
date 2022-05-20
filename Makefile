BIN := bin/ahmedmkamal.gexe

.PHONY: build

build: clean
	go build -o $(BIN)

.PHONY: clean

clean:
	rm -f $(BIN)
