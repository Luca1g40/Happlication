import React from "react";
import {Route, Routes} from "react-router-dom";

import Drinks from "./pages/Drinks";
import Foods from "./pages/Foods";
import Home from "./pages/Home";
import "./styles/Home.css"
import AllOrders from "./pages/AllOrders";
import ShoppingCart from "./components/ShoppingCart";
import Staff from "./pages/HomePageStaff";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="Drinks" element={<Drinks/>}/>
            <Route path="Foods" element={<Foods/>}/>
            <Route path="orders" element={<AllOrders/>}/>
            <Route path="shoppingcart" element={<ShoppingCart/>}/>
            <Route path="staff" element={<Staff/>}/>

        </Routes>
    )

}

export default App;
