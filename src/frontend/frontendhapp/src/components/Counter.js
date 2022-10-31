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
        console.log(props.submitMode)
    }, [count])


    return (props.submitMode) ? (
        <span>
            <span>
                <SubmitButton className="add-up" action={props.addUpAction} buttonText={"+"} tableId={props.tableId} productId={props.productId} productAmount={1} updateCount={()=>increment()} />
            </span>
             <span>
                 <p>{count}</p>
            </span>
             <span>
                 <SubmitButton className="subtract" action={props.subtractAction} buttonText={"-"} tableId={props.tableId} productId={props.productId} updateCount={()=>decrement()}/>
            </span>
        </span>
    ) : <span>
            <button className="add-up" onClick={increment}>+</button>
            <p>{count}</p>
            <button className="subtract" onClick={decrement}>-</button>
        </span>;
}