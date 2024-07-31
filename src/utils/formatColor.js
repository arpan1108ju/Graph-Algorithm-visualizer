


export const colorNode = (cyNode,color) => {
    cyNode.style({ 'background-color': color});
}

export const colorEdge = (cyEdge,color) => {
    cyEdge.style({'line-color': color});
}

export const colorEdgeArrow = (cyEdge,color) => {
    cyEdge.style({'target-arrow-color': color});
}

export const getGradientColor = (t,startColorHex, midColorHex, endColorHex) => {
      
    const hexToRgbArray = (hex) => {
        hex = hex.replace('#', '');
        return [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16)
        ];
    };
  
    const rgbArrayToHex = (rgbArray) => {
        const hex = rgbArray.map((color) => {
          const hexComponent = color.toString(16).padStart(2, '0');
          return hexComponent;
        });
        return `#${hex.join('')}`;
    };
  
    const interpolate = (a, b, c, t) => {
        if (t <= 0.5) {
        return parseInt(a + (b - a) * (t * 2),10);
        } else {
        return parseInt(b + (c - b) * ((t - 0.5) * 2),10);
        }
    };

    // Convert hex color strings to RGB values
    const startColorRGB = hexToRgbArray(startColorHex);
    const midColorRGB = hexToRgbArray(midColorHex);
    const endColorRGB = hexToRgbArray(endColorHex);

    console.log(`st : ${startColorRGB} ${midColorRGB} ${endColorRGB}`);
  
    // Interpolate RGB values based on t
    const r = interpolate(startColorRGB[0], midColorRGB[0], endColorRGB[0], t);
    const g = interpolate(startColorRGB[1], midColorRGB[1], endColorRGB[1], t);
    const b = interpolate(startColorRGB[2], midColorRGB[2], endColorRGB[2], t);
    
    console.log(`Got ${r} ${g} ${b}`);
    // Convert RGB values back to hex color string
    const hexColor = rgbArrayToHex([r, g, b]);
    console.log(`return hex is ${hexColor}`);
    return hexColor;
  };

  