import React, {useEffect, useState} from "react";
import "./submitData/SubmitButton.css"


export default function Counter(props) {
    const [count, setCount] = useState(props.initialValue);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => {
        if (count !== 1) {
            setCount(prevCount => prevCount - 1)
        }
    };

    useEffect(() => {
        console.log("count")
        props.updateCount(count);
    }, [count])

    return (
        <span>
            <button className="add-up" onClick={increment}>+</button>
            <p>{count}</p>
            <button className="subtract" onClick={decrement}>-</button>
        </span>
    )
}