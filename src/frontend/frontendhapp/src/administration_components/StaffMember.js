import React, {useState} from "react";
import StaffMemberDetailsPopup from "./StaffMemberDetailsPopup";


export default function MenuItem({member}) {
    const [buttonPopup, setButtonPopup] = useState(false)

    function handleClick() {
        setButtonPopup(true);
        console.log(buttonPopup)
    }
//TODO css toevoegen...
    return (
        <div className="listItemDiv">
            <StaffMemberDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} member={member}/>
            <li key={member.id} className={"listItem"} onClick={handleClick}>
                <span className={"memberSpan"}>naam: {member.name}&emsp;&emsp;</span>
                <span>wachtwoord: {member.password}&emsp;&emsp;</span>
                <span>{member.rights[0]}&emsp;&emsp;{member.rights[1]}</span>
            </li>
        </div>


    )


}