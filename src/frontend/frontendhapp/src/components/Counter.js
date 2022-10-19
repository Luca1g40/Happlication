import React, {useEffect, useState} from "react";
import "./submitData/SubmitButton.css"


export default function Counter(props) {
    const [count, setCount] = useState(props.initialValue);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => {
        if (count !== 0) {
            setCount(prevCount => prevCount - 1)
        }
    };

    useEffect(() => {
        console.log("count")
        props.updateCount(count);
    }, [count])

    return (
        <div>
            <button className="add-up" onClick={increment}>+</button>
            <h2>{count}</h2>
            <button className="subtract" onClick={decrement}>-</button>
        </div>
    )
}