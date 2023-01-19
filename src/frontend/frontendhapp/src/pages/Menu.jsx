import {Link} from "react-router-dom";
import FoodMenu from "../components/menu/FoodMenu";
import React from "react";
import {GetTableByNumber, setTimeAndStatus} from "../urlMappings/TableRequests";

export default function Menu() {

    async function logout(){
        const status = await GetTableByNumber
        const newDate = new Date()
        const LocalTime = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
        if (status !==0) {
            setTimeAndStatus(status, LocalTime)
            sessionStorage.clear();
            navigate("/app")
        }
    }
    function cleardata() {
        sessionStorage.clear();
        navigate("/");
    }
    return (
        <>
            <div className="menu-container">
                <div className={"navigation-buttons-menu space-around"}>
                    <button className="button logout-button" onClick={() => {
                        cleardata()
                    }}>Log out</button>
                    <Link className="button toHome" to="/home"> Terug </Link>
                    <Link to="/shoppingcart" className="button toShoppingcart">Shopping cart</Link>
                    <Link className="button toDrinks" to="/Drinks">Dranken</Link>
                </div>
                <FoodMenu/>
            </div>
        </>
    );
}
