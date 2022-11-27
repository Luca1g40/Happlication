import React, {useEffect, useState} from "react";
import {getAllTables} from "../../urlMappings/TableRequests";
import {Link} from "react-router-dom";
import OverviewTable from "../product/OverviewTable";
import StaffMemberDetailsPopup from "./StaffMemberDetailsPopup";
import Logout from "../utils/Logout"
import HomeNav from "../utils/Homebutton"
import TableDetailsPopup from "./TableDetailsPopup";

function AllTables() {
    const [tables, setTables] = useState([])
    const [buttonPopup, setButtonPopup] = useState(false)
    const [selectedTable, setSelectedTables] = useState();

    useEffect(() => {
        getAllTables()
            .then(res => {
                    console.log(res)
                    setTables(res)
                }
            )
            .catch(err =>
                console.log(err)
            )
    }, [])

    function showStatus(status){
        let string=""
        status.map(status=>{
            switch (status){
                case "OCCUPIED":
                    if (status.indexOf(status)===0){
                        string += "bezet"
                    }
                    break;
                case "CLOSED":
                    if (status.indexOf(status)===1){
                        string += "gesloten"
                    }
                    break;
            }

        })
        return string;
    }



    function handleClick(id) {
        let table = tables.filter(table => {
            return table.id === id;
        })
        setSelectedTables(table[0])
        setButtonPopup(true);
    }

    return (
        <>
            <div className={"listDiv"}>
                <h1>Tables</h1>

                <OverviewTable tableHeads={["amountOfPeople", "tableNr", "tableStatus"]} items={tables}
                               leaveOutList={["id", "elapsedTimeSinceOrder", "timeLeftToOrder", "shoppingCart", "kitchenOrders", "barOrders", "isHulpNodig"]}
                               specialDisplays={new Map([["status", (status)=>showStatus(status)]])} handleClick={(id) => handleClick(id)}/>
            </div>
            <TableDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} table={selectedTable}
                                     unselectTable={() => setSelectedTables(null)}/>
            <Logout/>
            <HomeNav/>
        </>
    )
}

export default AllTables

