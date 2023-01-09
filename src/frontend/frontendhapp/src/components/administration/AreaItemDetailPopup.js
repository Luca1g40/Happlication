import "../../styles/Popup.css"
import "../../styles/AllStaffMembers.css"
import "../../styles/AllArea.css"
import React, {useEffect, useState} from "react";
import {addStaffToArea, deleteAreaItem, getArea} from "../../urlMappings/AreaRequests";
import {getAllStaffMembers} from "../../urlMappings/StaffRequests";
import {addTableToArea, getAllTables} from "../../urlMappings/TableRequests";
import {tab} from "@testing-library/user-event/dist/tab";


function AreaItemDetailPopup(props) {
    const [staff, setStaff] = useState(["Select a staff"]);
    const [table, setTable] = useState(["Select a table"]);

    useEffect(() =>{
        getAllStaffMembers()
            .then(res=> {
                console.log(res)
                setStaff(res);
            })
            .catch(err=>{
                console.log(err);
            });

        getAllTables()
            .then(res => {
                console.log(res);
                setTable(res);
            })
            .catch(err => {
                console.log(err);
            })
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

    function updateArea(areaId) {
        const staffId = document.getElementById("staffId").value;
        if(staffId != null) {
            addStaffToArea(staffId, areaId);
        }

        const tableId = document.getElementById("tableId").value;
        if (tableId != null) {
            addTableToArea(tableId, areaId);
        }
    }


    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn close-memberpop" onClick={closePopUp}> X </button><br/>
                <form>
                    <h1>{props.area.name}</h1>
                    <br/><br/>
                    {props.area.tables.map(table =>{
                        return <div>
                            <label key={table.id}>Table Number: {table.tableNumber}</label>
                        </div>
                    })}

                    {props.area.staffWithoutAreasList.map(staff =>{
                        return <div>
                            <label key={staff.id}>Staff: {staff.name}</label>
                        </div>
                    })}
                </form>


                <select id="staffId" className="staff-dropdown" onChange={handleInputChange}>
                    <option value="Select a staff"> -- Select a staff -- </option>
                    {
                        staff.map((staffMember) =>
                            <option key={staffMember.id} value={staffMember.id} > {staffMember.name}</option>
                        )
                    }
                </select>

                <select id="tableId" className="staff-dropdown" onChange={handleInputChange}>
                    <option value="Select a staff"> -- Select a table -- </option>
                    {
                        table.map((tab) =>
                            <option key={tab.id} value={tab.id} > {tab.id}</option>
                        )
                    }
                </select>

                <button className={"update-bt"} onClick={() => updateArea(props.area.id) + closePopUp() + window.location.reload()}>Update</button>
                <button className={"delete-bt"} onClick={() => deleteArea(props.area.id) + closePopUp() + window.location.reload()}>Delete</button>

            </div>
        </div>
    ) : "";
}

export default AreaItemDetailPopup