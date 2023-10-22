const fragmentShader = `
varying vec2 vUvs; 
uniform vec2 uMouse;
float invLerp(float currVal, float minVal, float maxVal){
  return (currVal - minVal) / (maxVal - minVal);
}
float remap(float currVal, float inMin, float inMax, float outMin, float outMax){
  float t = invLerp(currVal, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {

 
  float mouseX = remap(uMouse.x,-1.0,1.0,0.0,1000.0);

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  vec3 pink = vec3(1.0, 0.0, 0.549);
  vec3 white = vec3(1.0, 1.0, 1.0);

   vec2 cell =  fract(vUvs * mouseX);
   cell = abs(cell - 0.5);
   float distToCell = 1.0 - 2.0 * max(cell.x,cell.y);
  float cellLine = smoothstep(0.0,0.1,distToCell);
   vec3 color = vec3(cellLine);

  gl_FragColor = vec4(color,1.0);
  
}

`;

export default fragmentShader;
