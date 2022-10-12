import React, {useState} from 'react'
import "../styles/Popup.css"
import Counter from "./Counter";


function Popup(props) {
    const event = new Event('sluiten');


    const [trigger, setTrigger] = useState(false)
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => {props.setTrigger(false); console.log(props.trigger); dispatchEvent(event)}}> close</button>
                {props.children}

            </div>
            <Counter initialValue={0}></Counter>
        </div>
    ) : "";

}

export default Popup