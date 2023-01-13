import React, {useEffect, useState} from "react";
import {getAllStaffMembers} from "../urlMappings/StaffRequests";
import {Link} from "react-router-dom";
import "../styles/AllStaffMembers.css"
import Logout from "../components/Logout"
import HomeNav from "../components/Homebutton"
import OverviewTable from "../components/product/OverviewTable";
import StaffMemberDetailsPopup from "./StaffMemberDetailsPopup";

function AllStaffMembers() {
    const [members, setMembers] = useState([])
    const [buttonPopup, setButtonPopup] = useState(false)
    const [selectedMember, setSelectedMember] = useState();


    useEffect(() => {
        getAllStaffMembers()
            .then(res => {
                    console.log(res)
                    setMembers(res)
                }
            )
            .catch(err =>
                console.log(err)
            )
    }, [])

    function showRights(rights) {
        let string = ""
        rights.map(right => {
            switch (right) {
                case "KITCHEN_RIGHTS":
                    if (rights.indexOf(right) === 0) {
                        string += "Keuken recht"
                    } else {
                        string += ", Keuken recht"
                    }
                    break;
                case "BAR_RIGHTS":
                    if (rights.indexOf(right) === 0) {
                        string += "Bar recht"
                    } else {
                        string += ", Bar recht"
                    }
                    break;
                case "SERVICE_RIGHTS":
                    if (rights.indexOf(right) === 0) {
                        string += "Service recht"
                    } else {
                        string += ", Service recht"
                    }
                    break;
                case "ADMIN_RIGHTS":
                    if (rights.indexOf(right) === 0) {
                        string += "Admin recht"
                    } else {
                        string += ", Admin recht"
                    }
                    break;
                case "ADMINISTRATION_RIGHTS":
                    if (rights.indexOf(right) === 0) {
                        string += "Administratie recht"
                    } else {
                        string += ", Administratie recht"
                    }
                    break;
            }

        })
        return string;
    }

    function handleClick(id) {
        let member = members.filter(member => {
            return member.id === id;
        })
        setSelectedMember(member[0])
        setButtonPopup(true);
    }

    return (
        <>
            <div className={"listDiv"}>
                <h1>Staff members</h1>
                {/*<ul className={"list"}>*/}
                {/*    {*/}
                {/*        members.map((member, i) =>*/}
                {/*            <StaffMember key={member.id} member={member}/>*/}
                {/*        )*/}
                {/*    }*/}
                {/*</ul>*/}

                <OverviewTable tableHeads={["name", "Rights"]} items={members}
                               leaveOutList={["operations", "claimedOrders", "claimedAndFinishedOrders", "areas", "password", "id"]}
                               specialDisplays={new Map([["rights", (rights) => showRights(rights)]])}
                               handleClick={(id) => handleClick(id)}/>
            </div>
            <StaffMemberDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} member={selectedMember}
                                     unselectMember={() => setSelectedMember(null)}/>


            <Link className={"button createStaffLink"} to="/createStaff" on>Maak een nieuw staff-member aan</Link>
            <Logout/>
            <HomeNav/>
        </>
    )
}

export default AllStaffMembers