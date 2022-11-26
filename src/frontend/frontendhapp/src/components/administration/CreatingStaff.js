import {CreateStaff} from "../../urlMappings/StaffRequests";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatingStaff(){
    let navigate = useNavigate();
    const [num, setNum] = useState('');

    async function create(){
        const firstname = document.getElementById("f").value;
        const password = document.getElementById("p").value;
        const rights = document.getElementById("r").value;
        let r;

        if(rights === "Keuken"){
            r = ["KITCHEN_RIGHTS"]
        }else if(rights === "Bar"){
            r = ["BAR_RIGHTS"]
        }else if(rights === "Keuken & bar"){
            r = ["KITCHEN_RIGHTS", "BAR_RIGHTS"]
        }

        const status = await CreateStaff(firstname, password, r)

        if (status === 200) {
            navigate("/AllstaffMembers");
        }else if (status === 400){
            toast(`Voer een geldig voornaam en wachtwoord in`);
        }
    }

    const handleNumChange = event => {
        const limit = 4;
        setNum(event.target.value.slice(0, limit));
    };

    return (<>
           <div className={"crud-form"}>
               <p className={"left-column"}>Voornaam</p>
               <input className={"right-column"} type="text" placeholder="Voornaam" id="f"/><br/><br/>
               <p className={"left-column"}>Wachtwoord</p>
               <input className={"right-column"} type="number" onChange={handleNumChange} placeholder="Wachtwoord" value={num} id="p"/><br/><br/>
               <p className={"left-column"}>Rechten</p>
               <select className={"right-column"} id="r" name="Rechten">
                   <option value="Keuken">Keuken</option>
                   <option value="Bar">Bar</option>
                   <option value="Keuken & bar">Keuken & bar</option>
               </select>
               <ToastContainer />
           </div>
            <input className={"button create-staff-button"} type="button" value="Staff-member aanmaken" onClick={() => {create()}}/>
        </>

)
}

export default CreatingStaff