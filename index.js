const parent_ele = document.getElementById('wrapper')

for (let i = 0; i < 300; i++){

  const child_ele = document.createElement('div')
  child_ele.setAttribute('class', 'particle')
  parent_ele.appendChild(child_ele)
}

const parent = parent_ele.children
stylesheet = document.createElement('style')
stylesheet.type = 'text/css'
document.head.appendChild(stylesheet)

for (let i = 0; i < 300; i++){
  const apply_style = parent[i]

  const z = Math.random() * 400;
  const y = Math.random() * 400;
  const hue = (40 / 300) * i;
  
  // Convert color code "5C5137" to HSL
  const hexToHSL = (hex) => {
    // Remove the hash character if it exists
    hex = hex.replace(/^#/, '');
  
    // Parse the hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    // Normalize RGB values to [0, 1]
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
  
    // Find the maximum and minimum values
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
  
    // Calculate the lightness
    const lightness = (max + min) / 2;
  
    // Calculate the saturation
    let saturation = 0;
    if (max !== min) {
      saturation = lightness > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    }
  
    // Calculate the hue
    let hue = 0;
    if (max !== min) {
      if (max === red) {
        hue = (green - blue) / (max - min) + (green < blue ? 6 : 0);
      } else if (max === green) {
        hue = (blue - red) / (max - min) + 2;
      } else {
        hue = (red - green) / (max - min) + 4;
      }
    }
    hue /= 6;
  
    return {
      hue: Math.round(hue * 360),
      saturation: Math.round(saturation * 100),
      lightness: Math.round(lightness * 100),
    };
  };
  
  const colorCode = '8C7853';
  const hsl = hexToHSL(colorCode);
  
  apply_style.style.animation = `orbit${i} 14s ${i * 0.01}s infinite`;
  apply_style.style.backgroundColor = `hsla(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%, 1)`;
  
  orbit_size = 300
  const orbitKeyFrame = `

  20%{
    opacity:1;
  }
  30%{
    transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(${orbit_size}px);
  }
  80%{
    transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(${orbit_size}px);
    opacity:1;
  }
  100%{
    transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(${orbit_size * 3}px);
  }
  `
  stylesheet.sheet.insertRule(`@keyframes orbit${i} {${orbitKeyFrame}}`)

}