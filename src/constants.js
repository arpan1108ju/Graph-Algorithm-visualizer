export const VISITED_COLOR_EDGE = '#f12000';
export const UNVISITED_COLOR_EDGE = '#666666';
export const INITIAL_COLOR_EDGE = '#666666';


export const VISITED_COLOR_NODE = '#f12000';
export const UNVISITED_COLOR_NODE = '#666666';
export const INITIAL_COLOR_NODE = '#666666';



export const STATE = {
    VISITED : 1,
    UNVISITED : 0
}

export const initialElements = [
    { data: { id: 'a' }, position: { x: 100, y: 100 } },
    { data: { id: 'b' }, position: { x: 200, y: 200 } },
    { data: { id: 'c' }, position: { x: 300, y: 150 } },
    { data: { id: 'd' }, position: { x: 400, y: 100 } },
    { data: { id: 'e' }, position: { x: 500, y: 200 } },
    { data: { id: 'ab', source: 'a', target: 'b' , weight : 0} },
    { data: { id: 'bc', source: 'b', target: 'c' , weight : 0} },
    { data: { id: 'cd', source: 'c', target: 'd' , weight : 0} },
    { data: { id: 'de', source: 'd', target: 'e' , weight : 0} }
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
      'label' : 'data(weight)',
      'width': 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
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