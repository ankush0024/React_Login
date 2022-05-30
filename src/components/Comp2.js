import React, { useContext } from 'react';
import { InputContext } from '../context/InputContextProvider';

function Comp2() {
  const {inputData, setInputData} = useContext(InputContext);
  console.log({inputData, setInputData});
  return (
    <div>comp2: {inputData}</div>
    
  )
}

export default Comp2