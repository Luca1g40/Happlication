import {useEffect, useState} from "react";
import axios from "axios";
import "../styles/staffNotificationCard.css"

function FetchTablesSettedOnTrue() {
    const [tafelsonTrue, setTafelsOnTrue] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/happ/staff/66/tablethatneedhelp")
            .then(res => {
                console.log(res)
                setTafelsOnTrue(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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
                </div>
                )
            }
        </div>
    )
}

export default FetchTablesSettedOnTrue