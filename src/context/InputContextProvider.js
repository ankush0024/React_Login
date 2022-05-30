import React, { useState, createContext } from 'react';
export const InputContext = createContext();
const InputContextProvider = (props) => {
    const [inputData, setInputData] = useState("initital value");
    return (
        <InputContext.Provider value={{ 
            "inputData":inputData,"setInputData":setInputData
        }}>
        	{props.children}
        </InputContext.Provider>
    );
}
export default InputContextProvider;
