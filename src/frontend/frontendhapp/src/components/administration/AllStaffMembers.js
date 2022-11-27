import React, {useEffect, useRef, useState} from "react";
import {getAllStaffMembers} from "../../urlMappings/StaffRequests";
import {Link} from "react-router-dom";
import "../../styles/AllStaffMembers.css"
import Logout from "../utils/Logout"
import HomeNav from "../utils/Homebutton"
import OverviewTable from "../product/OverviewTable";
import StaffMemberDetailsPopup from "./StaffMemberDetailsPopup";
import DropdownFilter from "../product/DropdownFilter";

function AllStaffMembers() {
    const [members, setMembers] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [selectedMember, setSelectedMember] = useState();
    const [optionSelected, setOptionSelected] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const ref = useRef();

    useEffect(() => {
        handleChange()
    },[optionSelected])

    useEffect(() => {
        getAllStaffMembers()
            .then(res => {
                    setMembers(res)
                setFilteredMembers(res)
                }
            )
            .catch(err =>
                console.log(err)
            )
    }, [])

    function getUniqueRights(members){
        let categoryOptions = [];
        let staffRights = members.map(member => {return member.rights})
        const uniqueRightsEnum = staffRights.filter((x, i, a) => a.indexOf(x) === i)
        uniqueRightsEnum.map(right => {
            categoryOptions.push({value: right[0], label: showRight(right[0])})
        })
        return categoryOptions
    }

    function showRight(right){
        switch (right){
            case "KITCHEN_RIGHTS":
                return "Kitchen right";
            case "BAR_RIGHTS":
                return "Bar right";
        }
    }

    function showRights(rights) {
        let string = ""
        rights.map(right => {
            switch (right) {
                case "KITCHEN_RIGHTS":
                    if (rights.indexOf(right) === 0) {
                        string += "kitchen rights"
                    }else{
                        string += ", kitchen rights"
                    }
                    break;
                case "BAR_RIGHTS":
                    if (rights.indexOf(right) === 0) {
                        string += "bar rights"
                    }else{
                        string += ", bar rights"
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

    function handleChange (){
        const value = ref.current.value
        let filterMembers = []
        if (value.trim().length > 0){
            filterMembers = members.filter((member)=>{
                console.log(member.name.toLowerCase().includes(value.toLowerCase()))
                return member.name.toLowerCase().includes(value.toLowerCase())
            })
        }else{
            filterMembers = members;
        }


        if (!(optionSelected.value === undefined)){
            filterMembers = filterMembers.filter(member => {
                return member.rights.includes(optionSelected.value)
            })
        }

        setFilteredMembers(filterMembers)
    }



    return (
        <>
            <h1>Staff members</h1>
            <div className={"wrapper"}>
                <div className={"filter-div"}>
                    <h2>Filters</h2>
                    <input className={"search-bar"} ref={ref} placeholder={"Search"} name={"search"} onChange={handleChange}/>
                    <DropdownFilter options={getUniqueRights(members)} setOptionSelected={(selected) => setOptionSelected(selected)} optionSelected={optionSelected}/>
                </div>
                <div className={"search-table"}>
                    <OverviewTable tableHeads={["name", "Rights"]} items={filteredMembers}
                                   leaveOutList={["operations", "claimedOrders", "claimedAndFinishedOrders", "areas", "password", "id"]}
                                   specialDisplays={new Map([["rights", (rights) => showRights(rights)]])} handleClick={(id) => handleClick(id)}/>
                </div>
            </div>

            <Link className={"button createStaffLink"} to="/createStaff">Maak een nieuw staff-member aan</Link>
            <Logout/>
            <HomeNav/>
            <StaffMemberDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} member={selectedMember} unselectMember={() => setSelectedMember(null)}/>
        </>
    )
}
export default AllStaffMembers