#include <igraph.h>
#include <Emscripten.h>
#include <math.h>

EMSCRIPTEN_KEEPALIVE
void random_3d_layout() {
    igraph_t g;
    igraph_matrix_t res;
    igraph_vector_t v1;
    igraph_vector_init(&v1, 8);
    VECTOR(v1)[0] = 0;
    VECTOR(v1)[1] = 1;
    VECTOR(v1)[2] = 1;
    VECTOR(v1)[3] = 2;
    VECTOR(v1)[4] = 2;
    VECTOR(v1)[5] = 3;
    VECTOR(v1)[6] = 2;
    VECTOR(v1)[7] = 2;
    igraph_create(&g, &v1, 0, 0);
    igraph_matrix_init(&res, 0, 0);
    igraph_layout_random_3d(&g, &res);
    
    int n = igraph_vcount(&g);
    for (int i=0; i<n; i++) {
      printf("%6.3f %6.3f %6.3f %6.3f\n", MATRIX(res, i, 0), MATRIX(res, i, 1), MATRIX(res, i, 2), MATRIX(res, i, 3));
    }

    igraph_destroy(&g);
    igraph_matrix_destroy(&res);
    igraph_vector_destroy(&v1);
}

 