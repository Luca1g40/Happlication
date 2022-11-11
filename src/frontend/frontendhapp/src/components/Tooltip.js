import React, {useEffect, useState} from 'react';
import {GetShoppingCart} from "../urlMappings/TableRequests";



export default function Tooltip(props){
    const [visibility,setVisibility] = useState(props.toolTipVisibility)

    useEffect(() => {
        console.log(visibility)
    }, [])


    // const changeStyle = event => {
    //     if (event.currentTarget.style.visibility==="visible"){
    //         event.currentTarget.style.visibility="hidden";
    //     }else{
    //         event.currentTarget.style.visibility="visible";
    //     }
    // }



    return(
        <span style={{visibility:visibility}} className="tooltiptext">{props.text}</span>
    )
}