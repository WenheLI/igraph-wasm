import factory, { LibIgraphModule } from '../libigraph';
import { GraphInstance } from './Graph';

class Graph {
    private instance: LibIgraphModule;
    private ready: boolean = false;


    init = async () => {
        this.instance = await factory();
        this.ready = true;
    }

    createInstance = (): GraphInstance => {
        this.checkReady();
        return new GraphInstance(this.instance);
    }

    private checkReady = () => {
        if (!this.ready) {
            throw new Error('Graph is not ready');
        }
    }
}

export {
    Graph
}