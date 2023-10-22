const fragmentShader = `
varying vec2 vUvs; 
uniform vec2 uMouse;
uniform vec2 uResolution;

uniform sampler2D doraemonSkin; 
uniform sampler2D doraemonSkeleton;

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
 
   
    distFromCenter = smoothstep(0.1,0.15,distFromCenter);

    float vignette = 1.0 - distFromCenter;
    return vec3( vignette );
  }

 
 
void main() {

 
 

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  vec3 white = vec3(1.0, 1.0, 1.0);

  float value1 = vUvs.x;
  float value2 = 1.0 - vUvs.x ;

  vec3 gradient1 = mix(yellow,blue,value1);
  vec3 gradient2 = mix(blue,yellow,value1);
  

  vec2 pixelCoord = vUvs - 0.5;
  vec3 color = BackgroundColor();

  vec3 mixColor = mix(gradient1,gradient2,color);
 
  vec4 bg2 = texture2D(doraemonSkin,vUvs);
  vec4 bg1 = texture2D(doraemonSkeleton,vUvs);
  gl_FragColor = mix(bg2,bg1,vec4(color,color.x));
  
}

`;

export default fragmentShader;
