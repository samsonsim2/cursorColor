import "./App.css";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box } from "@mui/material";
import fragmentShader from "./fragment-shader";

import vertexShader from "./vertex-shader";
import { useMemo, useRef } from "react";
import {
	 
	Vector2,
 
} from 'three';
function App() {
  

  function Model(props) {
    const meshRef = useRef();
    
    const { viewport } = useThree();
    useFrame(
      (state) =>{
        (meshRef.current.uniforms.uMouse.value = {
          x: state.mouse.x * 10,
          y: state.mouse.y * 10,
      })
      console.log(meshRef.current.uniforms.uMouse.value.x)}
    );

    const uniforms = useMemo(() => ({
      uMouse: { value: new Vector2(0.5, 0.5) },       
    }), []);
    return (
      <mesh  >
        <planeGeometry args={[20, 20, 32, 32]} />
        <shaderMaterial  ref={meshRef}      
        uniforms= {uniforms} 
        fragmentShader={fragmentShader}
        vertexShader={vertexShader} />
      </mesh>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Canvas>
      <Model/>
      </Canvas>
    </Box>
  );
}

export default App;
