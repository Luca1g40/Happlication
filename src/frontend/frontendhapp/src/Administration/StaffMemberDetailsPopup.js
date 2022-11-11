import "../styles/Popup.css"
import "../styles/AllStaffMembers.css"
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

    async function updateStaffMember(password){
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
        const status = await UpdateStaff(password, firstname, r)

        if (status === 200) {
            window.location.reload();
        }else if (status === 400){
            document.getElementById("error").style.visibility = "visible";
        }
    }

    function checkRights(rightOne, rightTwo){
        if(rightTwo !== undefined){
            return "Keuken & bar"
        }
        if(rightOne !== undefined){
            if(rightOne === "KITCHEN_RIGHTS") {
                return "Keuken"
            }else if(rightOne === "BAR_RIGHTS"){
                return "Bar"
            }
        }
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn close-memberpop" onClick={closePopUp}> X </button><br/>
                <form>
                    <h4 className={"member-text"}>Voornaam:</h4>
                    <input type="text" className={"member-data"} id="f" defaultValue={props.member.name}/><br/><br/>
                    <h4 className={"member-text"}>Wachtwoord:</h4>
                    <label className={"member-password"}>{props.member.password}</label><br/><br/>
                    <h4 className={"member-text"}>Rechten:</h4>
                    <select id="r" name="Rechten" className={"member-data"} defaultValue={checkRights(props.member.rights[0], props.member.rights[1])}>
                        <option value="">Geen recht</option>
                        <option value="Keuken">Keuken</option>
                        <option value="Bar">Bar</option>
                        <option value="Keuken & bar">Keuken & bar</option>
                    </select><br/><br/>
                    <p className="error-message" id="error">Voer een geldig voornaam in</p>
                </form>
                <button className={"update-btn"} onClick={() => updateStaffMember(props.member.password)}>Updaten</button>
                <button className={"delete-btn"} onClick={() => deleteStaffMember(props.member.id) + closePopUp() + window.location.reload()}>Verwijderen</button>
            </div>
        </div>
    ) : "";
}

export default ProductDetailsPopup