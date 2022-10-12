import React, {useState} from "react";



export default function Counter({initialValue}){
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () =>{
        if (count!==0){
            setCount(prevCount => prevCount - 1)
        }
    };

    return(
        <div>
            <button  className="add-up" onClick={increment}>+</button>
            <h2>{count}</h2>
            <button  className="subtract" onClick={decrement}>-</button>

        </div>
    )


}