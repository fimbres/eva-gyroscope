import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'

export default function MovementRecognizer({ x, y, setMovementCode }) {
    const [movement, setMovement] = useState("None");
    useEffect(() => {
      return () => {
        handleChange(x, y);
      }
    }, [x, y]);

  const handleChange = (x, y) => {
      if(y < -0.30){
        setMovement("Right");
        setMovementCode("r");
      }
      else if(y > 0.30){
        setMovement("Left");
        setMovementCode("l");
      }
      else if(x < -0.30){
        setMovement("Down");
        setMovementCode("d");
      }
      else if(x > 0.30){
        setMovement("Up");
        setMovementCode("u");
      }
      else{
        setMovement("None");
        setMovementCode("");
      }
      return movement;
  };

  return (
      <Text>{ movement }</Text>
  )
};