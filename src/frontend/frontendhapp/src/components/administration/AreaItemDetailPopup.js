import "../../styles/Popup.css"
import "../../styles/AllStaffMembers.css"
import React from "react";
import {deleteAreaItem} from "../../urlMappings/AreaRequests";


function AreaItemDetailPopup(props) {

    function closePopUp() {
        console.log("closing popup")
        props.unselectArea();
        props.setTrigger(false);
    }

    function deleteArea(areaId) {
        console.log("areadId", areaId);
        deleteAreaItem(areaId);
    }


    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn close-memberpop" onClick={closePopUp}> X</button>
                <br/>
                <form>
                    {/*<label className={"member-text"}>Area naam:</label>*/}
                    {/*<input type="text" className={"member-data"} id="f" defaultValue={props.area.name}/>*/}
                    <h1>{props.area.name}</h1>
                    <br/><br/>
                    {props.area.tables.map(table => {
                        return <div>
                            <label>Table Number: {table.tableNumber}</label>
                        </div>
                    })}

                    {props.area.staffWithoutAreasList.map(staff => {
                        return <div>
                            <label>Staff: {staff.name}</label>
                        </div>
                    })}
                </form>

                <button className={"update-btn"}>Update</button>
                <button className={"delete-btn"}
                        onClick={() => deleteArea(props.area.id) + closePopUp() + window.location.reload()}>Delete
                </button>

            </div>
        </div>
    ) : "";
}

export default AreaItemDetailPopup