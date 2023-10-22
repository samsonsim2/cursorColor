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

  float sdfCircle(vec2 p, float r){
    return length(p) - r;
  
  }

  float sdSegment( vec2 p,  vec2 a, vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

float opSubtraction(float d1,float d2){
  return max(-d1,d2);
}

float softMax (float a, float b, float k){
  return log(exp(k*a) + exp(k*b)) /k ;
}
float softMin (float a, float b, float k){
  return -softMax(-a,-b,k);
}
  

 
 
void main() {

 
 

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  vec3 pink = vec3(1.0, 0.0, 0.549);
  vec3 white = vec3(1.0, 1.0, 1.0);

  float value1 = vUvs.x;
  float value2 = 1.0 - vUvs.x ;

  vec3 gradient1 = mix(yellow,blue,value1);
  vec3 gradient2 = mix(blue,yellow,value1);
  

  
  vec3 color = BackgroundColor();

   
  vec2 pixelCoords = (vUvs - 0.5) * uResolution;
   
  float d =    sdfCircle(pixelCoords, 100.0)  ;
  float d2 =    sdfCircle(pixelCoords - vec2(uMouse*uResolution), 50.0)  ;

  
  float d3 = softMin(d2,d,0.05); // for union blob
  

 
  color = mix(gradient1,yellow,smoothstep(0.0,1.0,d3));
 
  
  

  gl_FragColor = vec4(color,1.0);
  
}

`;

export default fragmentShader;
