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
        <div>
            <div>
                <SubmitButton className="add-up" action={props.addUpAction} buttonText={"+"} tableId={props.tableId} productId={props.productId} productAmount={1} updateCount={()=>increment()} />
            </div>
             <div>
                 <p>{count}</p>
            </div>
             <div>
                 <SubmitButton className="subtract" action={props.subtractAction} buttonText={"-"} tableId={props.tableId} productId={props.productId} updateCount={()=>decrement()}/>
            </div>
        </div>
    ) : <div className={"counter-grid"}>
            <div className={"grid-item-3"}>
                <button className="add-up" onClick={increment}>+</button>
            </div>
            <div className={"grid-item-2"} >
                <p>{count}</p>
            </div>
            <div className={"grid-item-4"}>
                <button className="subtract grid-item-2" onClick={decrement}>-</button>
            </div>
        </div>;
}