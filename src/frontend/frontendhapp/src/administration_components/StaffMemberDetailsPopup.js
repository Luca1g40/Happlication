import "../styles/Popup.css"
import React from "react";
import {DeleteStaff} from "../urlMappings/StaffRequests";

function ProductDetailsPopup(props) {

    function closePopUp() {
        console.log("closing popup")
        props.setTrigger(false);
    }

    function deleteStaffMember(staffId){
        console.log("staffid? " + staffId)
        DeleteStaff(staffId)
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className={"gerecht-aantal"}>
                    <p className={"grid-item-1"}>naam: {props.member.name} </p>
                    <button className="close-btn" onClick={closePopUp}> X </button>
                </div>
                <div className={"label-div"}>
                    <label>wachtwoord: {props.member.password}</label>
                </div>
                <button onClick={() => deleteStaffMember(props.member.id)}> Delete {props.member.name} </button>
            </div>
        </div>
    ) : "";
}

export default ProductDetailsPopup