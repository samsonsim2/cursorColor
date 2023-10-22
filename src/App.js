import "./App.css";

import { Canvas, useFrame, useThree,useLoader } from "@react-three/fiber";
import { Box } from "@mui/material";
//import fragmentShader from "./fragment-shader3"; // for blob
import fragmentShader from "./fragment-shader2"; // for doraemon
// import fragmentShader from "./fragment-shader4"; 
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import vertexShader from "./vertex-shader";
import { useMemo, useRef } from "react";
import {
	 
	Vector2,
 
} from 'three';
function App() {
  const doraemonSkin = useLoader(TextureLoader, 'doraemon_skin.png')
  const doraemonSkeleton = useLoader(TextureLoader, 'doraemon_skeleton.png')
  

  function Model(props) {
    const meshRef = useRef();
    
    const { size,mouse } = useThree();

    useFrame(
      (state) =>{
        (meshRef.current.uniforms.uMouse.value = {
          x: mouse.x ,
          y: mouse.y ,
      }
      )

      meshRef.current.uniforms.uResolution.value = {
        x: size.width*0.45,
        y: size.height
    }

      
      console.log(meshRef.current.uniforms.uMouse.value.x)
      console.log(mouse)
      console.log(size)
       }
    
    );

    const uniforms = useMemo(() => ({
      uMouse: { value: new Vector2(0.5, 0.5) },
      uResolution: { value: new Vector2(0.5, 0.5) },
      doraemonSkin : {value: doraemonSkin},
      doraemonSkeleton: {value: doraemonSkeleton}
          
    }), []);
    return (
      <mesh  >
        <planeGeometry args={[8,8, 32, 32]} />
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
