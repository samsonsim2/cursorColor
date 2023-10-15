const fragmentShader = `
varying vec2 vUvs; 
uniform vec2 uMouse;

 
void main() {

 
 
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 white = vec3(1.0, 1.0, 1.0);
 

  vec3 color = vec3(abs(uMouse.x));
  gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;
