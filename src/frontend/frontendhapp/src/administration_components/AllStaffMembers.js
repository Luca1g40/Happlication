import React, {useEffect, useState} from "react";
import {getAllStaffMembers} from "../urlMappings/StaffRequests";
import StaffMember from "../administration_components/StaffMember";

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
            </ul>
        </div>
    )
}
export default AllStaffMembers