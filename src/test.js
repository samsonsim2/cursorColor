const mousePosition = useRef({ x: 0, y: 0 });

const updateMousePosition = useCallback((e) => {
  mousePosition.current = { x: e.pageX, y: e.pageY };
}, []);

const uniforms = useMemo(
  () => ({
    u_time: {
      value: 0.0,
    },
    u_mouse: { value: new Vector2(0, 0) },
    
  }),
  []
);

useEffect(() => {
  window.addEventListener("mousemove", updateMousePosition, false);

  return () => {
    window.removeEventListener("mousemove", updateMousePosition, false);
  };
}, [updateMousePosition]);

useFrame((state) => {
  const { clock } = state;

  mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  mesh.current.material.uniforms.u_mouse.value = new Vector2(
    mousePosition.current.x,
    mousePosition.current.y
  );
});
