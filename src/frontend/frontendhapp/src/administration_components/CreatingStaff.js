import axios from "axios";
import {configuration} from "../urlMappings/JwtHeader";

function CreatingStaff(){

    function create(){
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

        axios.post(`http://localhost:8080/happ/staff`, {
            "password" : password,
            "name" : firstname,
            "rights" : r
        }, configuration)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
           <form>
               <h4>Voornaam</h4>
               <input type="text" placeholder="Voer voornaam in" id="f"/>
               <h4>Wachtwoord</h4>
               <input type="password" placeholder="Voer wachtwoord in" maxLength="4" minLength="4" id="p"/>
               <h4>Rechten</h4>
               <select id="r" name="Rechten">
                   <option value="Keuken">Keuken</option>
                   <option value="Bar">Bar</option>
                   <option value="Keuken & bar">Keuken & bar</option>
               </select><br/><br/>
               <input type="button" value="Staff-member aanmaken"  onClick={() => {create()}}/>
           </form>
    )
}

export default CreatingStaff