#include <igraph.h>
#include <Emscripten.h>
#include <math.h>

EMSCRIPTEN_KEEPALIVE
igraph_vector_t* create_vectors(int numOfEdges, int* edges) {
  igraph_vector_t* vec = malloc(sizeof(igraph_vector_t));
  if (numOfEdges % 2 == 1) return -1;
  igraph_vector_init(vec, numOfEdges);
  for (int i = 0; i < numOfEdges; i++) {
    VECTOR(*vec)[i] = edges[i];
  }
  return vec;
}

EMSCRIPTEN_KEEPALIVE
igraph_t* create_graph(igraph_vector_t* vec) {
  igraph_t* g = malloc(sizeof(igraph_t));
  igraph_create(g, vec, 0, 0);
  return g;
}

EMSCRIPTEN_KEEPALIVE
igraph_matrix_t* create_matrix() {
  igraph_matrix_t* m = malloc(sizeof(igraph_matrix_t));
  igraph_matrix_init(m, 0, 0);
  return m;
}

EMSCRIPTEN_KEEPALIVE
void random_3d_layout(igraph_t* g, igraph_matrix_t* matrix) {
  igraph_layout_random_3d(g, matrix);
}

EMSCRIPTEN_KEEPALIVE
double* query_matrix(igraph_matrix_t* matrix, int idx) {
  double* res = malloc(sizeof(double) * 3);
  double x = MATRIX(*matrix, idx, 0);
  double y = MATRIX(*matrix, idx, 1);
  double z = MATRIX(*matrix, idx, 1);
  *res = x;
  *(res + 1) = y;
  *(res + 2) = z;
  return res;
}

EMSCRIPTEN_KEEPALIVE
void free_data(double* data) {
  free(data);
}

EMSCRIPTEN_KEEPALIVE
void destory_graph(igraph_t* g) {
  igraph_destroy(g);
}

EMSCRIPTEN_KEEPALIVE
void destory_vector(igraph_vector_t* vec) {
  igraph_vector_destroy(vec);
}

EMSCRIPTEN_KEEPALIVE
void destory_matrix(igraph_matrix_t* matrix) {
  igraph_matrix_destroy(matrix);
}
