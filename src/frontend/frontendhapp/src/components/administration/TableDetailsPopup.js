import "../../styles/Popup.css"
import "../../styles/AllStaffMembers.css"
import React, {useEffect} from "react";
import {DeleteTable, getAllTables} from "../../urlMappings/TableRequests";

function tableDetailsPopup(props) {
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
                <button className="close-btn close-memberpop" onClick={closePopUp}> X </button><br/>
                <form>
                    <h4 className={"member-text"}>Tafel Nummer</h4>
                    <label className={"member-password"}></label><br/><br/>
                    <h4 className={"member-text"}>Aantal mensen: </h4>
                    <label className={"member-data"}></label><br/><br/>
                    <h4 className={"member-text"}>Tafel status</h4>

                </form>
                <button className={"delete-button"} onClick={() => deleteTable(props.table.id) + closePopUp()}>Verwijderen</button>
            </div>
        </div>
    ) : "";
}

export default tableDetailsPopup