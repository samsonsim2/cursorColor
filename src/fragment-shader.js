const fragmentShader = `
varying vec2 vUvs; 
uniform vec2 uMouse;
uniform vec2 uResolution;
float invLerp(float currVal, float minVal, float maxVal){
  return (currVal - minVal) / (maxVal - minVal);
}
float remap(float currVal, float inMin, float inMax, float outMin, float outMax){
  float t = invLerp(currVal, inMin, inMax);
  return mix(outMin, outMax, t);
}

  vec3 BackgroundColor(){
    float mouseX = remap(uMouse.x,-1.0,1.0,0.0,1.0);
    float mouseY = remap(uMouse.y,-1.0,1.0,0.0,1.0);
    
    float distFromCenter = length(abs(vUvs-vec2(mouseX,mouseY)));
 
   
    distFromCenter = smoothstep(0.1,0.4,distFromCenter);
    return vec3(distFromCenter );
  }

 
 
void main() {

 
 
  // vec3 red = vec3(1.0, 0.0, 0.0);
  // vec3 blue = vec3(0.0, 0.0, 1.0);
  // vec3 white = vec3(1.0, 1.0, 1.0);
 

 

  vec2 pixelCoord = vUvs - 0.5;
  vec3 color = BackgroundColor();

  // float mouseX = remap(uMouse.x,-1.0,1.0,0.0,1.0);
  // vec3 temp = vec3(mouseX);
  gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;
