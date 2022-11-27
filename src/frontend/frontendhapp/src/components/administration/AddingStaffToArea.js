import {useEffect, useState} from "react";
import {addStaffToArea} from "../../urlMappings/AreaRequests";

function AddingStaffToArea() {
    const [addStaffMemberToArea, setAddStaffMemberToArea] = useState([]);

    useEffect(() => {
        addStaffToArea()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return(
        <>
            <div>
                <h1>Adding Staff to area</h1>
            </div>
        </>
    )
}

export default AddingStaffToArea