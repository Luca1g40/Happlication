import React, {useEffect, useState} from "react";
import {getAllStaffMembers} from "../urlMappings/StaffRequests";
import StaffMember from ".//StaffMember";
import {Link} from "react-router-dom";
import "../styles/AllStaffMembers.css"

function AllStaffMembers() {
    const [members, setMembers] = useState([])

    useEffect(() => {
        getAllStaffMembers()
            .then(res =>
                setMembers(res)

            )
            .catch(err =>
                console.log(err)
            )
    }, [])

    return (
        <>
            <div className={"listDiv"}>
                <h1>Staff members</h1>
                <ul className={"list"}>
                    {
                        members.map((member, i) =>
                            <StaffMember key={member.id} member={member}/>
                        )
                    }
                </ul>
            </div>
            <Link className={"button createStaffLink"} to="/createStaff">Maak een nieuw staff-member aan</Link>
        </>
            )
}
export default AllStaffMembers