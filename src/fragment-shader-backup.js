const fragmentShader = `
varying vec2 vUvs; 
uniform vec2 u_resolution;
 
void main() {

  float value1 = vUvs.x;
  float value2 = smoothstep(0.0, 1.0, vUvs.x);
  //flips the curve
  float value3 = smoothstep(1.0, 0.0, vUvs.x);

  float bezierSlope = step(0.04,abs(vUvs.y - value2));
  float flippedBezierSlope = step(0.04,abs(vUvs.y -value3));
  float linearSlope = step(0.005,abs(vUvs.y -value1));  
  float linearLine = step(0.04,abs(vUvs.y -0.5)); 

  float verticalLine = step(0.04,abs(value1 - 0.5));
    

  //Create gradient 
 
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 color = vec3(0.0);

  
  
 
 color = mix(red,blue,pct);
  
  gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;
