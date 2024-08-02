export const VISITED_COLOR_EDGE = '#f12000';
export const UNVISITED_COLOR_EDGE = '#666666';
export const INITIAL_COLOR_EDGE = '#666666';


export const VISITED_COLOR_NODE = '#f12000';
export const UNVISITED_COLOR_NODE = '#666666';
export const INITIAL_COLOR_NODE = '#666666';

export var ANIMATION_TIME_MS = 300;

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
    { data: { id: 'a' }, position: { x: 100, y: 100 } },
    { data: { id: 'b' }, position: { x: 200, y: 200 } },
    { data: { id: 'c' }, position: { x: 300, y: 150 } },
    { data: { id: 'd' }, position: { x: 400, y: 100 } },
    { data: { id: 'e' }, position: { x: 500, y: 200 } },
    { data: { id: 'a-b', source: 'a', target: 'b' , weight : 0} },
    { data: { id: 'b-c', source: 'b', target: 'c' , weight : 0} },
    { data: { id: 'c-d', source: 'c', target: 'd' , weight : 0} },
    { data: { id: 'd-e', source: 'd', target: 'e' , weight : 0} }
  ];

export const initalStylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': '#666',
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
      'label' : '',
      'width': 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': '',
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