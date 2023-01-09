import React, {useEffect, useState} from "react";
import "../../styles/staffNotificationCard.css"
import {klantIsGeholpen} from "../../urlMappings/TableRequests";
import {GetTableThatNeedHelp} from "../../urlMappings/StaffRequests";

function FetchTablesSetTrue() {
    const [tafelsonTrue, setTafelsOnTrue] = useState([])
    const staffId = sessionStorage.getItem("staffId");

    useEffect(() => {
        GetTableThatNeedHelp(staffId)
            .then(res => {
                console.log("1st", res)
                setTafelsOnTrue(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="grid-container-notification-card">
            {
                tafelsonTrue.map((tafel) =>
                <div key={tafel.id} className={"grid-item-notification-card"} >
                    <div>Tafel Nummer : {tafel.tableNumber}</div>
                    <div>Aantal Gasten : {tafel.amountOfPeople}</div>
                    <div>Tijd over om te bestellen: {tafel.timeLeftToOrder} minuten</div>
                    <button onClick={() => { klantIsGeholpen(tafel.id); refreshPage();}} className="button help-button">Klant is Geholpen</button>
                </div>
                )
            }
        </div>
    )
}

export default FetchTablesSetTrue