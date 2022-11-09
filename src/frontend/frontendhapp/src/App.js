import React from "react";
import {Route, Routes} from "react-router-dom";

import Drinks from "./pages/Drinks";
import Foods from "./pages/Foods";
import Home from "./pages/Home";
import "./styles/Home.css";
import Orders from "./pages/Orders";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import Staff from "./pages/HomePageStaff";
import PersonalModule from "./pages/PersonalModule";
import ViewProductForm from "./components/menu/ViewProductForm";
import SearchProduct from "./components/menu/SearchProduct";
import ViewIngredient from "./components/menu/ViewIngredient";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="Drinks" element={<Drinks/>}/>
            <Route path="Foods" element={<Foods/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="shoppingcart" element={<ShoppingCart/>}/>
            <Route path="staff" element={<Staff/>}/>
            <Route path="claims" element={<PersonalModule/>}/>
            <Route path="productdetails/:id" element={<ViewProductForm/>}/>
            <Route path="createproduct/" element={<ViewProductForm/>}/>
            <Route path="ingredientdetails/:id" element={<ViewIngredient/>}/>
            <Route path="createingredient" element={<ViewIngredient/>}/>
            <Route path="searchproduct" element={<SearchProduct/>}/>

        </Routes>
    )

}

export default App;
