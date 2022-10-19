import React from "react";
import PersonalOrdersFetching from "../components/PersonalOrders";
import "../styles/AllOrders.css"


export default function PersonalModule() {


    return (
        <>
            <div className={"orderContainer"}>
                <PersonalOrdersFetching/>
            </div>
        </>
    )
}