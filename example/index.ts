import { Graph } from '../src/index';

const main = async () => {
    const g = new Graph();
    await g.init();
    g.feed([0,1,2,1,3,2], 4);
    g.fruchtermanReingold3DLayout(100, 10);
    console.log(g.queryPoint(0, 3));
    console.log(g.queryPoint(1, 3));
}

main();