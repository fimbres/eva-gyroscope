import React, { useEffect } from 'react'
import { Text } from 'react-native'

export default function MovementRecognizer({ x, y, movementCode, setMovementCode }) {
  const handleChange = (x, y) => {
      if(y < -0.30){
        setMovementCode("r");
      }
      else if(y > 0.30){
        setMovementCode("l");
      }
      else if(x < -0.30){
        setMovementCode("d");
      }
      else if(x > 0.30){
        setMovementCode("u");
      }
      else{
        setMovementCode("");
      }
  };

  useEffect(() => {
    return () => {
      handleChange(x, y);
    }
  }, [x, y]);

  return (
      movementCode === "r" ? <Text>Right</Text> :
      movementCode === "u" ? <Text>Up</Text> :
      movementCode === "d" ? <Text>Down</Text> :
      movementCode === "l" ? <Text>Left</Text> : 
      <Text>None</Text>
  );
};