export const stylesheet = [
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
        'label' : 'data(id)',
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