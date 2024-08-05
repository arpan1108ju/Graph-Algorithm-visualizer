export const VISITED_COLOR_EDGE = '#f12000';
export const UNVISITED_COLOR_EDGE = '#666666';
export const INITIAL_COLOR_EDGE = '#666666';


export const VISITED_COLOR_NODE = '#f12000';
export const UNVISITED_COLOR_NODE = '#666666';
export const INITIAL_COLOR_NODE = '#666666';

export const TABLE_ROW_BG_COLOR = '#FFFFFF';
export const TABLE_ROW_BG_FLASH_COLOR = '#C8C8C8';

// speed 0 --> 1000 , 

export const ANIMATION_TIME_MS_SPEED_LOW = 1000;
export const ANIMATION_TIME_MS_SPEED_HIGH = 100;
export const INITIAL_SPEED = 30;
export const MIN_SPEED = 0;
export const MAX_SPEED = 100;


export var ANIMATION_TIME_MS = 300;

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const STATE =  Object.freeze({
    VISITED : 1,
    UNVISITED : 0
})

export const GRAPH_ALGORITHM = Object.freeze({
  DEFAULT : "NO ALGO",
  DEPTH_FIRST_SEARCH: "DFS",
  BREADTH_FIRST_SEARCH: "BFS",
  DIJKSTRA: "DIJKSTRA",
  BELLMAN_FORD: "BELLMAN FORD",
  A_STAR: "A STAR",
  FLOYD_WARSHALL: "FLOYD WARSHALL",
  KRUSKAL: "KRUSKAL",
  PRIM: "PRIM",
  TOPOLOGICAL_SORT: "TOPOLOGICAL SORT",
  TARJAN: "TARJAN",
  KOSARAJU: "KOSARAJU"
});

export const initialElements = [
    { data: { id: 'a' }, position: { x: 250, y: 100 } },
    { data: { id: 'b' }, position: { x: 200, y: 200 } },
    { data: { id: 'c' }, position: { x: 300, y: 150 } },
    { data: { id: 'd' }, position: { x: 400, y: 100 } },
    { data: { id: 'e' }, position: { x: 500, y: 200 } },
    { data: { id: 'a-b', source: 'a', target: 'b' , weight : 1} },
    { data: { id: 'b-c', source: 'b', target: 'c' , weight : 2} },
    { data: { id: 'c-d', source: 'c', target: 'd' , weight : 3} },
    { data: { id: 'd-e', source: 'd', target: 'e' , weight : 4} },
    { data: { id: 'a-c', source: 'a', target: 'c' , weight : 5} },
    { data: { id: 'b-d', source: 'b', target: 'd' , weight : 5} },
  ];

export const initalStylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': INITIAL_COLOR_NODE,
      'label': 'data(id)',
      'text-valign': 'center',
      'color': '#fff',
      'font-size': '10px',
      'width': 25,
      'height': 25
    }
  },
  {
    selector: 'edge',
    style: {
      'label' : 'data(weight)',
      'width': 3,
      'line-color': INITIAL_COLOR_EDGE,
      'target-arrow-color': INITIAL_COLOR_EDGE,
      'target-arrow-shape': 'triangle',
      'curve-style': 'unbundled-bezier',
      'control-point-distances': 50, // Control distances can be adjusted dynamically
      'control-point-weights': 0.5,
      'line-fill': 'solid'
    }
  }
];

export const layout = {
  name: 'preset',
};