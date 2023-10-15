import { useState, useEffect } from 'react';

function useContinuousMousePosition() {
  // Initialize state to store the mouse position
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  // Function to update the mouse position
  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY }); 
  };

  // Add event listener for mousemove when the component mounts
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return mousePosition;
}

export default useContinuousMousePosition;
