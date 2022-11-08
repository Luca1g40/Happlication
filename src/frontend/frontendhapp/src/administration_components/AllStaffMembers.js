import React, {useEffect, useState} from "react";
import {getAllStaffMembers} from "../urlMappings/StaffRequests";
import StaffMember from "../administration_components/StaffMember";
import {Link} from "react-router-dom";

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
        <div className={"listDiv"}>
            <ul className={"list"}>
                <h1>Staff members</h1>
                {
                    members.map((member, i) =>
                        <StaffMember key={member.id} member={member}/>
                    )
                }
                <Link to="/createStaff">Maak een nieuw staff-member aan</Link>
            </ul>
        </div>
    )
}
export default AllStaffMembers