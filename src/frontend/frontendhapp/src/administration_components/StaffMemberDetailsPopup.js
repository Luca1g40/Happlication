import "../styles/Popup.css"
import React from "react";
import {DeleteStaff, UpdateStaff} from "../urlMappings/StaffRequests";

function ProductDetailsPopup(props) {

    function closePopUp() {
        console.log("closing popup")
        props.setTrigger(false);
    }

    function deleteStaffMember(staffId){
        console.log("staffid? " + staffId)
        DeleteStaff(staffId)
    }

    function updateStaffMember(){
        const firstname = document.getElementById("f").value;
        const password = document.getElementById("p").value;
        const rights = document.getElementById("r").value;
        let r;

        if(rights === "Keuken"){
            r = ["KITCHEN_RIGHTS"]
        }else if(rights === "Bar"){
            r = ["BAR_RIGHTS"]
        }else if(rights === "Keuken & bar"){
            r = ["KITCHEN_RIGHTS", "BAR_RIGHTS"]
        }
        UpdateStaff(password, firstname, r)
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button onClick={() => closePopUp()}> Close </button>
                <form>
                    <h4>Voornaam</h4>
                    <input type="text" value={props.member.name} id="f"/>
                    <h4>Wachtwoord</h4>
                    <input type="text" value={props.member.password} maxLength="4" minLength="4" id="p"/>
                    <h4>Rechten</h4>
                    <select id="r" name="Rechten">
                        <option hidden disabled selected value> -- selecteer een recht -- </option>
                        <option value="Keuken">Keuken</option>
                        <option value="Bar">Bar</option>
                        <option value="Keuken & bar">Keuken & bar</option>
                    </select><br/><br/>
                    <input type="button" value="Update" onClick={() => updateStaffMember() + closePopUp()}/>
                </form>
                <button onClick={() => deleteStaffMember(props.member.id) + closePopUp()}> Delete {props.member.name} </button>
            </div>
        </div>
    ) : "";
}

export default ProductDetailsPopup