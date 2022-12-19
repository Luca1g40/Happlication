import "../../styles/Popup.css"
import "../../styles/AllStaffMembers.css"
import "../../styles/AllArea.css"
import React, {useEffect, useState} from "react";
import {deleteAreaItem} from "../../urlMappings/AreaRequests";
import {getAllStaffMembers} from "../../urlMappings/StaffRequests";


function AreaItemDetailPopup(props) {
    const [staff, setStaff] = useState(["Select a staff"]);

    useEffect(() =>{
        getAllStaffMembers()
            .then(res=> {
                console.log(res)
                setStaff(res);
            })
            .catch(err=>{
                console.log(err);
            });
    }, [])

    let handleInputChange = (e) => {
        console.log("handleInputChange", e.target.value)
        return e.target.value;
    }


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
                <button className="close-btn close-memberpop" onClick={closePopUp}> X </button><br/>
                <form>
                    {/*<label className={"member-text"}>Area naam:</label>*/}
                    {/*<input type="text" className={"member-data"} id="f" defaultValue={props.area.name}/>*/}
                    <h1>{props.area.name}</h1>
                    <br/><br/>
                    {props.area.tables.map(table =>{
                        return <div>
                            <label>Table Number: {table.tableNumber}</label>
                        </div>
                    })}

                    {props.area.staffWithoutAreasList.map(staff =>{
                        return <div>
                            <label>Staff: {staff.name}</label>
                        </div>
                    })}
                </form>


                <select className="staff-dropdown" onChange={handleInputChange}>
                    <option value="Select a staff"> -- Select a staff -- </option>
                    {
                        staff.map((staffMember) =>
                            <option value={staffMember.id} > {staffMember.name}</option>
                        )
                    }
                </select>

                <button className={"update-bt"} >Update</button>
                <button className={"delete-bt"} onClick={() => deleteArea(props.area.id) + closePopUp() + window.location.reload()}>Delete</button>

            </div>
        </div>
    ) : "";
}

export default AreaItemDetailPopup