import React from "react";
import {Route, Routes} from "react-router-dom";

import Drinks from "./pages/Drinks";
import Foods from "./pages/Foods";
import Home from "./pages/Home";
import "./styles/Home.css"
import AllOrders from "./pages/AllOrders";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="Drinks" element={<Drinks/>}/>
            <Route path="Foods" element={<Foods/>}/>
            <Route path="allorders" element={<AllOrders/>}/>

        </Routes>
    )

}

export default App;
