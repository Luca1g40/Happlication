import React, {useEffect, useState} from "react";
import "../../styles/Counter.css"
import SubmitButton from "../submitData/SubmitButton";


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
        <div className={"counter-grid"}>
            <div>
                <SubmitButton className="subtract grid-item-2 counter-button" action={props.subtractAction} buttonText={"-"} tableId={props.tableId} productId={props.productId} updateCount={()=>decrement()}/>
            </div>

            <div className={"grid-item-2"} >
                <label>{count}</label>
            </div>

            <div className={"grid-item-3"}>
                <SubmitButton className="add-up counter-button" action={props.addUpAction} buttonText={"+"} tableId={props.tableId} productId={props.productId} productAmount={1} updateCount={()=>increment()} />
            </div>
        </div>

    ) : <div className={"counter-grid"}>
            <div className={"grid-item-4"}>
                <button className="subtract grid-item-2 counter-button" onClick={decrement}>-</button>
            </div>

            <div className={"grid-item-2"} >
                <label>{count}</label>
            </div>

            <div className={"grid-item-3"}>
                <button className="add-up counter-button" onClick={increment}>+</button>
            </div>

        </div>;
}