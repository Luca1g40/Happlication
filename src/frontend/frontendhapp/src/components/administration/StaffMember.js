// import React, {useState} from "react";
// import StaffMemberDetailsPopup from "./StaffMemberDetailsPopup";
// import "../../styles/AllStaffMembers.css"
//
//
// export default function MenuItem({member}) {
//     const [buttonPopup, setButtonPopup] = useState(false)
//
//     function handleClick() {
//         setButtonPopup(true);
//     }
//
//     function checkRights(rightOne, rightTwo){
//         if(rightTwo !== undefined){
//             return "Keuken & Bar"
//         }
//         if(rightOne !== undefined){
//             if(rightOne === "KITCHEN_RIGHTS") {
//                 return "Keuken"
//             }else if(rightOne === "BAR_RIGHTS"){
//                 return "Bar"
//             }
//         }
//         return ""
//     }
//
//     return (
//         <div className="listItemDiv">
//             <StaffMemberDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} member={member}/>
//             <li key={member.id} className={"listItem"} onClick={handleClick}>
//                 <span className={"memberNameSpan"}>naam: {member.name}</span>
//                 <span className={"memberPasswordSpan"}>wachtwoord: {member.password}</span>
//                 <span className={"memberRightsSpan"}>{checkRights(member.rights[0], member.rights[1])}</span>
//             </li>
//         </div>
//
//
//     )
//
//
// }