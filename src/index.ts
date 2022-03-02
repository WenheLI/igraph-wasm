import factory, { LibIgraphModule } from '../libigraph';

class Graph {
    private dataPointer: number = -1;
    private vectorsPointer: number = -1;
    private matrixPointer: number = -1;
    private graphPointer: number = -1;
    private instance: LibIgraphModule;
    private ready: boolean = false;
    public numOfNodes: number = 0;
    public numofEdges: number = 0;

    init = async () => {
        this.instance = await factory();
        this.ready = true;
    }

    // nodesCount should be fetech from the graph
    feed = (data: number[], nodesCount: number) => {
        if (!this.ready) {
            throw new Error('Graph not ready');
        }
        this.dataPointer = this.createIntArray(data);
        this.numOfNodes = nodesCount;
        this.numofEdges = data.length / 2;
        this.vectorsPointer = this.instance._create_vectors(data.length, this.dataPointer);
        this.graphPointer = this.instance._create_graph(this.vectorsPointer);
        this.matrixPointer = this.instance._create_matrix();
    }

    queryPoint = (idx: number, length: number) => {
        if (!this.ready) {
            throw new Error('Graph not ready');
        }
        const dataPointer = this.instance._query_matrix(this.matrixPointer, idx);
        return this.readPointer(dataPointer, length);
    }

    random3DLayout = () => {
        this.checkReady();
        this.instance._random_3d_layout(this.graphPointer, this.matrixPointer);
    }

    sphereLayout = () => {
        this.checkReady();
        this.instance._sphere_layout(this.graphPointer, this.matrixPointer);
    }
    
    gridLayout = (width: number, height: number) => {
        this.checkReady();
        this.instance._grid_layout(this.graphPointer, this.matrixPointer, width, height);
    }

    fruchtermanReingold3DLayout = (niter: number, startTemp: number) => {
        this.checkReady();
        this.instance._fruchterman_reingold_3d(this.graphPointer, this.matrixPointer, niter, startTemp);
    }

    kamadaKawai3DLayout = (maxiter: number, epsilon: number, kkconst: number) => {
        this.checkReady();
        this.instance._kamada_kawai_3d(this.graphPointer, this.matrixPointer, maxiter, epsilon, kkconst);
    }

    drl3DLayout = () => {
        this.checkReady();
        this.instance._drl_3d(this.graphPointer, this.matrixPointer);
    }


    private createIntArray = (data: number[]) => {
        if (!this.ready) {
            throw new Error('Graph not ready');
        }
        const arr = new Int32Array(data);
        const pointer = this.instance._malloc(arr.length * arr.BYTES_PER_ELEMENT);
        this.instance.HEAP32.set(arr, pointer / arr.BYTES_PER_ELEMENT);
        return pointer;
    }

    private readPointer = (pointer: number, length: number, dataType: Emscripten.CType = 'double'): number[] => {
        if (!this.ready) {
            throw new Error('Graph not ready');
        }

        // TODO Currently only support double
        const offset = dataType === 'double' ? Float64Array.BYTES_PER_ELEMENT : Int32Array.BYTES_PER_ELEMENT;

        const arr = new Array(length);
        for (let i = 0; i < length; i++) {
            //@ts-ignore
            const val = this.instance.getValue(pointer + offset * i, dataType);
            arr[i] = val;
        }
        return arr;
    }

    private checkReady = () => {
        if (!this.ready) {
            throw new Error('Graph not ready');
        }
    }
}

export {
    Graph
}