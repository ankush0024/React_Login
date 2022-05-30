import React, {useState, useContext} from 'react'
import { InputContext } from '../context/InputContextProvider';
function Comp1() {
   const handleOnInput = (e) =>{
    setInputData(e.target.value);
   }
   const {inputData:data, setInputData} = useContext(InputContext);
  //  const [inputData, setInputData] = useState('intial value');
  return (
    <div className='container'><p>input some text</p> <input style={{width:'400px'}}  type="email" class="form-control" value={data} onInput={handleOnInput} id="exampleInputEmail1" aria-describedby="emailHelp" /></div>
  )
}

export default Comp1