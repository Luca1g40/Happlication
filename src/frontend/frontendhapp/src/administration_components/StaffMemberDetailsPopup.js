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

    function updateStaffMember(password){
        const firstname = document.getElementById("f").value;
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

    function checkRights(rightOne, rightTwo){
        if(rightTwo !== undefined){
            return "Keuken & Bar"
        }
        if(rightOne !== undefined){
            if(rightOne === "KITCHEN_RIGHTS") {
                return "Keuken"
            }else if(rightOne === "BAR_RIGHTS"){
                return "Bar"
            }
        }
    }

//TODO bij keuken en bar recht geeft select "geen recht" aan. Moet zijn "Keuken & Bar"
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button onClick={() => closePopUp()}> Close </button>
                <form>
                    <h4>Voornaam</h4>
                    <input type="text" id="f" defaultValue={props.member.name}/>
                    <h4>Wachtwoord</h4>
                    <label>{props.member.password}</label>
                    <h4>Rechten</h4>
                    <select id="r" name="Rechten" defaultValue={checkRights(props.member.rights[0], props.member.rights[1])}>
                        <option value="">Geen recht</option>
                        <option value="Keuken">Keuken</option>
                        <option value="Bar">Bar</option>
                        <option value="Keuken & bar">Keuken & bar</option>
                    </select><br/><br/>
                    <input type="button" value="Update" onClick={() => updateStaffMember(props.member.password) + closePopUp() + window.location.reload(false)}/>
                </form>
                <button onClick={() => deleteStaffMember(props.member.id) + closePopUp() + window.location.reload(false)}> Delete {props.member.name} </button>
            </div>
        </div>
    ) : "";
}

export default ProductDetailsPopup