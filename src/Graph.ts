import { LibIgraphModule } from "../libigraph";

class GraphInstance {
    private dataPointer: number = -1;
    private vectorsPointer: number = -1;
    private matrixPointer: number = -1;
    private graphPointer: number = -1;
    public numOfNodes: number = 0;
    public numofEdges: number = 0;

    private instance: LibIgraphModule;

    constructor(instance: LibIgraphModule) {
        this.instance = instance;
    }

    feed = (data: number[], nodesCount: number) => {
        this.dataPointer = this.createIntArray(data);
        this.numOfNodes = nodesCount;
        this.numofEdges = data.length / 2;
        this.vectorsPointer = this.instance._create_vectors(data.length, this.dataPointer);
        this.graphPointer = this.instance._create_graph(this.vectorsPointer);
        this.matrixPointer = this.instance._create_matrix();
    }

    queryPoint = (idx: number, length: number) => {
        const dataPointer = this.instance._query_matrix(this.matrixPointer, idx);
        return this.readPointer(dataPointer, length);
    }

    random3DLayout = () => {
        this.instance._random_3d_layout(this.graphPointer, this.matrixPointer);
    }

    sphereLayout = () => {
        this.instance._sphere_layout(this.graphPointer, this.matrixPointer);
    }
    
    gridLayout = (width: number, height: number) => {
        this.instance._grid_layout(this.graphPointer, this.matrixPointer, width, height);
    }

    fruchtermanReingold3DLayout = (niter: number, startTemp: number) => {
        this.instance._fruchterman_reingold_3d(this.graphPointer, this.matrixPointer, niter, startTemp);
    }

    kamadaKawai3DLayout = (maxiter: number, epsilon: number, kkconst: number) => {
        this.instance._kamada_kawai_3d(this.graphPointer, this.matrixPointer, maxiter, epsilon, kkconst);
    }

    drl3DLayout = () => {
        this.instance._drl_3d(this.graphPointer, this.matrixPointer);
    }

    free = () => {
        this.instance._free(this.dataPointer);
        this.instance._destory_vector(this.vectorsPointer);
        this.instance._destory_graph(this.graphPointer);
        this.instance._destory_matrix(this.matrixPointer);
    }


    private createIntArray = (data: number[]) => {
        const arr = new Int32Array(data);
        const pointer = this.instance._malloc(arr.length * arr.BYTES_PER_ELEMENT);
        this.instance.HEAP32.set(arr, pointer / arr.BYTES_PER_ELEMENT);
        return pointer;
    }

    private readPointer = (pointer: number, length: number, dataType: Emscripten.CType = 'double'): number[] => {
        // TODO Currently only support double
        const offset = dataType === 'double' ? Float64Array.BYTES_PER_ELEMENT : Int32Array.BYTES_PER_ELEMENT;

        const arr = new Array(length);
        for (let i = 0; i < length; i++) {
            const val = this.instance.getValue(pointer + offset * i, dataType);
            arr[i] = val;
        }
        return arr;
    }

}

export {
    GraphInstance
}