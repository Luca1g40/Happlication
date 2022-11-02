import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/staffNotificationCard.css"
import {configuration} from "../urlMappings/JwtHeader";

function FetchTablesSettedOnTrue() {
    const [tafelsonTrue, setTafelsOnTrue] = useState([])
    const staffId = sessionStorage.getItem("staffId");

    useEffect(() => {
        axios.get(`http://localhost:8080/happ/staff/${staffId}/tablethatneedhelp`, configuration)
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

    let tafelId = 74;
    function klantIsGeholpen(){
        axios.put(`http://localhost:8080/happ/table/${tafelId}/helpNodig`, {//todo->tafelId moet zelf opgehaald worden
            "setHulpBool" : "false"
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div className="grid-container">
            {
                tafelsonTrue.map((tafel) =>
                <div key={tafel.id} className={"grid-item grid-item"} >
                    <span>Tafel Nummer : {tafel.tableNumber}</span>
                    <br/>
                    <span>Aantal Gasten : {tafel.amountOfPeople}</span>
                    <br/>
                    <span>Tijd over om te bestellen: {tafel.timeLeftToOrder} minuten</span>
                    <button onClick={() => { klantIsGeholpen(); refreshPage();}} className="helpDoneBut">Klant is Geholpen</button>
                </div>
                )
            }
        </div>
    )
}

export default FetchTablesSettedOnTrue