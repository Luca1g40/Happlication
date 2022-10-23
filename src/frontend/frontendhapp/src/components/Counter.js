import React, {useEffect, useState} from "react";
import "./submitData/SubmitButton.css"
import SubmitButton from "./submitData/SubmitButton";


export default function Counter(props) {
    const [count, setCount] = useState(props.initialValue);

    const increment = () => {
        setCount(prevCount => prevCount + 1)};
    const decrement = () => {
        if (count !== 1) {
            setCount(prevCount => prevCount - 1)
        }
    };

    useEffect(() => {
        props.updateCount(count);
    }, [count])


    return (props.submitMode) ? (
        <span>
            <SubmitButton className="add-up" action={props.addUpAction} buttonText={"+"} tableId={props.tableId} productId={props.productId} productAmount={1} updateCount={()=>increment()} />
            <p>{count}</p>
            <SubmitButton className="subtract" action={props.subtractAction} buttonText={"-"} tableId={props.tableId} productId={props.productId}/>
        </span>
    ) : <span>
            <button className="add-up" onClick={increment}>+</button>
            <p>{count}</p>
            <button className="subtract" onClick={decrement}>-</button>
        </span>;
}