export interface LibIgraphModule extends EmscriptenModule {
    _create_vectors(numOfEdges: number, edgesPointer: number): number;
    _create_graph(vectorsPointer: number): number;
    _create_matrix(): number;
    _random_3d_layout(graphPointer: number, matrixPointer: number): void;
    _query_matrix(matrixPointer: number, idx: number): number;
    _free_data(dataPointer: number): void;
    _destory_vector(vectorsPointer: number): void;
    _destory_graph(graphPointer: number): void;
    _destory_matrix(matrixPointer: number): void;
    _getValue: typeof getValue;

}

export default function libIgraphFactory(): Promise<LibIgraphModule>;