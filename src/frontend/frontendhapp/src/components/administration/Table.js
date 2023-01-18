import React, {useState} from "react";
import tableDetailsPopup from "./TableDetailsPopup";
import "../../styles/AllStaffMembers.css"


export default function table({table}) {
    const [buttonPopup, setButtonPopup] = useState(false)

    function handleClick() {
        setButtonPopup(true);
    }

    function checkStatus(statusOne){
        if (statusOne == "OCCUPIED"){
            return "bezet"
        }
        else if(statusOne === "CLOSED"){
            return "gesloten"
        }
        return ""
    }

    return (
        <div className="listItemDiv">
            <tableDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} table={table}/>
            <li key={table.id} className={"listItem"} onClick={handleClick}>
                <span className={"memberNameSpan"}>tafel nummer: {table.number}</span>
                <span className={"memberPasswordSpan"}>aantal personen: {table.amount}</span>
                <span className={"memberRightsSpan"}>{checkStatus(table.status[0], table.status[1])}</span>
            </li>
        </div>
    )
}