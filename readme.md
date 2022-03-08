# Igraph Wasm
[![npm version](https://badge.fury.io/js/igraph-wasm.svg)](https://badge.fury.io/js/igraph-wasm)

This is an igraph wasm export that's targeting for browser and nodejs.

## Usage

```ts
import { Graph } from '../src/index';

const main = async () => {
    const g = new Graph();
    await g.init();
    const instance = g.createInstance();
    instance.feed([0,1,2,1,3,2], 4);
    instance.fruchtermanReingold3DLayout(100, 10);
    console.log(instance.queryPoint(0, 3));
    console.log(instance.queryPoint(1, 3));
    instance.free();
}

main();
```
