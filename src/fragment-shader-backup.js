const fragmentShaderColor = `
 
 
 
void main() {

     
    vec3 color = vec3(0.0,0.0,0.0)
    gl_FragColor = vec4(color, 1.0); // add the new colors to your output
   
}

`;

export default fragmentShaderColor;
