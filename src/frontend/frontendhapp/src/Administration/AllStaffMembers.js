import React, {useEffect, useState} from "react";
import {getAllStaffMembers} from "../urlMappings/StaffRequests";
import StaffMember from "./StaffMember";
import {Link} from "react-router-dom";
import "../styles/AllStaffMembers.css"
import Logout from "../components/Logout"
import HomeNav from "../components/Homebutton"
import OverviewTable from "../components/product/OverviewTable";

function AllStaffMembers() {
    const [members, setMembers] = useState([])

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

    function showRights(rights){
        let string=""
        rights.map(right=>{
            switch (right){
                case "KITCHEN_RIGHTS":
                    if (rights.indexOf(right)===0){
                        string=string+"kitchen rights"
                    }else{
                        string=string+", kitchen rights"
                    }
                    break;
                case "BAR_RIGHTS":
                    if (rights.indexOf(right)===0){
                        string=string+"bar rights"
                    }else{
                        string=string+", bar rights"
                    }

                    break;
            }

        })
        return string;
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
                               specialDisplays={new Map([["rights", (rights)=>showRights(rights)]])}/>
            </div>

            <Link className={"button createStaffLink"} to="/createStaff" on>Maak een nieuw staff-member aan</Link>
            <Logout/>
            <HomeNav/>
        </>
    )
}
export default AllStaffMembers