import { ANIMATION_TIME_MS, STATE } from "../constants";
import { animateEdge, animateNode } from "../utils/formatColor";

class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {
        this.nodes.push({ key, priority });
        this.sort();
    }

    dequeue() {
        return this.nodes.shift();
    }

    sort() {
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.nodes.length === 0;
    }
}

export const dijkstra = async (cy, graph, startNode, isDirected, isWeighted) => {
    console.log('dijkstra');
    // Implementation for Dijkstra's algorithm
    const distances = {};
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[startNode] = 0;

    const pq = new PriorityQueue();
    pq.enqueue(0, startNode);
    const parent = {};
    parent[startNode] ='#'

    while (!pq.isEmpty()) {
        const { key: currentNode } = pq.dequeue();
        console.log("node: ",currentNode," parent: ",parent[currentNode]);
        
        await animateNode(cy,currentNode,STATE.VISITED,ANIMATION_TIME_MS);
        await animateEdge(cy,parent[currentNode], currentNode,STATE.VISITED,ANIMATION_TIME_MS,isDirected);

        for (const [neighbor, edgeWeight] of graph[currentNode]) {
            const distance = parseInt(distances[currentNode], 10) + parseInt(edgeWeight, 10);
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                parent[neighbor] = currentNode;
                pq.enqueue(distance, neighbor);
            }
        }
    }
    console.log("distance array: ",distances);
    
};