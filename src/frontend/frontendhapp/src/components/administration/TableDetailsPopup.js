import "../../styles/Popup.css"
import "../../styles/AllStaffMembers.css"
import React, {useEffect} from "react";
import {DeleteTable, getAllTables} from "../../urlMappings/TableRequests";

function TableDetailsPopup(props) {
    useEffect(() => {
        getAllTables()
            .then(res => {
                console.log(res)
            }
            )
            .catch(err =>
            console.log(err)
            )
    }, [])

    function closePopUp() {
        console.log("closing popup")
        props.unselectTable();
        props.setTrigger(false);
    }

    function deleteTable(tableId){
        console.log("tableid? " + tableId)
        DeleteTable(tableId)
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn close-memberpop" onClick={ () => closePopUp + window.location.reload()}> X </button><br/>
                <form>
                    <h4 className={"member-text"}>Tafel Nummer</h4>
                    <label className={"member-password"}>{props.table.number}</label><br/><br/>
                    <h4 className={"member-text"}>Aantal mensen: </h4>
                    <label className={"member-data"}>{props.table.amount}</label><br/><br/>
                    <h4 className={"member-text"}>Tafel status</h4>

                </form>
                <button className={"delete-button"} onClick={() => deleteTable(props.table.id) + closePopUp() + window.location.reload()}>Verwijderen</button>
            </div>
        </div>
    ) : "";
}

export default TableDetailsPopup