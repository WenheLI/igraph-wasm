export interface LibIgraphModule extends EmscriptenModule {
    _create_vectors(numOfEdges: number, edgesPointer: number): number;
    _create_graph(vectorsPointer: number): number;
    _create_matrix(): number;
    
    _random_3d_layout(graphPointer: number, matrixPointer: number): void;
    _grid_layout(graphPointer: number, matrixPointer: number, width: number, height: number): void;
    _fruchterman_reingold_3d(graphPointer: number, matrixPointer: number, niter: number, startTemp: number): void;
    _kamada_kawai_3d(graphPointer: number, matrixPointer: number, maxiter: number, epsilon: number, kkconst: number): void;
    _drl_3d(graphPointer: number, matrixPointer: number): void;
    _sphere_layout(graphPointer: number, matrixPointer: number): void;

    _query_matrix(matrixPointer: number, idx: number): number;
    _free_data(dataPointer: number): void;
    _destory_vector(vectorsPointer: number): void;
    _destory_graph(graphPointer: number): void;
    _destory_matrix(matrixPointer: number): void;
    getValue: typeof getValue;

}

export default function libIgraphFactory(): Promise<LibIgraphModule>;