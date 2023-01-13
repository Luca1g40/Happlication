import React, {useEffect, useState} from "react";
import {getAllAreas} from "../../urlMappings/AreaRequests";
import AreaItemDetailPopup from "./AreaItemDetailPopup";
import OverviewTable from "../product/OverviewTable";
import {Link} from "react-router-dom";

// import "../../styles/AllArea.css"

function AllArea() {

    const [allAreas, setAllAreas] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false)
    const [selectedArea, setSelectedArea] = useState();


    useEffect(() => {
        getAllAreas()
            .then(res => {
                console.log("res", res);
                setAllAreas(res);
            })
            .then(err => {
                console.log(err);
            });
    }, [])

    function handleClick(id) {
        console.log("geklikt op row");
        console.log("id", id)
        let area = allAreas.filter(area => {
            return area.id === id;
        });

        setSelectedArea(area[0]);
        setButtonPopup(true);
    }

    return (
        <>
            <div className="listDiv">

                {
                    allAreas.map((area) => {
                        return (
                            <div key={area.id}>
                                <div>
                                    <OverviewTable tableHeads={["name"]} items={allAreas}
                                                   leaveOutList={["staffWithoutAreasList", "tables", "id"]}
                                                   handleClick={(id) => handleClick(id)}/>
                                </div>
                                <AreaItemDetailPopup trigger={buttonPopup} setTrigger={setButtonPopup}
                                                     area={selectedArea} unselectArea={() => setSelectedArea(null)}/>
                                <Link className={"button createStaffLink"} to="/createArea" on>Maak een nieuw Area
                                    aan</Link>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default AllArea