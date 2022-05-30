import React, { useContext } from 'react';
import { InputContext } from '../context/InputContextProvider';
function Comp3() {
  const {inputData, setInputData} = useContext(InputContext);
  return (
    <div>comp3: {inputData}</div>
  )
}

export default Comp3