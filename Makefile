CC = emcc
CXX = em++

CFLAGS = -Wall -Wconversion -O3 -fPIC
BUILD_DIR = libigraph/
DEMO_DIR = demo/
EMCCFLAGS = -s ASSERTIONS=2 -s "EXPORT_NAME=\"iGraph\"" -s MODULARIZE=1 -s DISABLE_EXCEPTION_CATCHING=0 -s NODEJS_CATCH_EXIT=0  -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_RUNTIME_METHODS=['getValue']

LIB_GRAPH_BASE = ./igraph
LIB_GRAPH = ./igraph/build/src/libigraph.a
LIB_BUILD_GRAPH_INCLUDE = -I./igraph/build/include
LIB_GRAPH_INCLUDE = -I./igraph/include

all: wasm

libigraph:
	@echo "Building libigraph"
	mkdir -p $(LIB_GRAPH_BASE)/build;
	cd $(LIB_GRAPH_BASE)/build && emcmake cmake .. && emmake cmake --build .

wasm: lib/main.c libigraph
	@echo "Building wasm"
	rm -rf $(BUILD_DIR); 
	mkdir -p $(BUILD_DIR);
	cp lib/index.d.ts $(BUILD_DIR)
	$(CC) $(CFLAGS) $(EMCCFLAGS) -o $(BUILD_DIR)/index.js ./lib/main.c $(LIB_BUILD_GRAPH_INCLUDE) $(LIB_GRAPH_INCLUDE)  $(LIB_GRAPH)

demo: demo.c libigraph
	rm -rf $(DEMO_DIR); 
	mkdir -p $(DEMO_DIR);
	$(CC) $(CFLAGS) -o $(DEMO_DIR)/demo.js demo.c $(LIB_BUILD_GRAPH_INCLUDE) $(LIB_GRAPH_INCLUDE)  $(LIB_GRAPH)