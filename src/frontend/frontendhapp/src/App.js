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
import ViewProductForm from "./components/product/ViewProductForm";
import SearchProduct from "./components/product/SearchProduct";
import ViewIngredient from "./components/ingredient/ViewIngredient";
import StaffDashboard from "./pages/StaffDashboard";
import CreateStaff from "./pages/CreateStaff"
import AllStaffMembers from "./Administration/AllStaffMembers";
import StaffModuleHomePagina from "./pages/StaffModuleHomePagina";
import AdministrationPage from "./pages/AdministrationPage";

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
            <Route path="staffDashboard" element={<StaffDashboard/>}/>
            <Route path="createStaff" element={<CreateStaff/>}/>
            <Route path="allStaffMembers" element={<AllStaffMembers/>}/>
            <Route path="staffmodule" element={<StaffModuleHomePagina/>}/>
            <Route path="administration" element={<AdministrationPage/>}/>
            <Route path="productdetails/:id" element={<ViewProductForm/>}/>
            <Route path="createproduct/" element={<ViewProductForm/>}/>
            <Route path="ingredientdetails/:id" element={<ViewIngredient/>}/>
            <Route path="createingredient" element={<ViewIngredient/>}/>
            <Route path="searchproduct" element={<SearchProduct/>}/>
        </Routes>
    )

}

export default App;
