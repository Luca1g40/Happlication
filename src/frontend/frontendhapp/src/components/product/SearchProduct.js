import React, {useEffect, useRef, useState} from "react";
import {getAllCategories, getAllProducts} from "../../urlMappings/MenuRequests";
import {Link, useNavigate} from 'react-router-dom';
import "../../styles/SearchTable.css"
import DropdownFilter from "./DropdownFilter";
import OverviewTable from "./OverviewTable";
import HomeNav from "../utils/Homebutton";


export default function SearchProduct() {
    const [allProducts, setAllProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [allCategories, setCategories] = useState([]);
    const ref = useRef();
    let navigate = useNavigate()

    const [optionSelected, setOptionSelected] = useState([])


    useEffect(() => {

        getAllProducts()
            .then(res => {
                console.log(res)
                setAllProducts(res);
                setFilteredProducts(res);
            })
            .catch(err => {
                console.log(err)
            })

        getAllCategories()
            .then(res => {
                setCategories(res)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    useEffect(() => {
        handleChange()
    }, [optionSelected])

    function getAllCategoryOptions() {
        let categoryOptions = [];
        allCategories.map(category => {
            categoryOptions.push({value: category.name, label: category.name})
        })
        return categoryOptions
    }

    function handleChange() {
        const value = ref.current.value
        let filterProduct = []
        if (value.trim().length > 0) {
            filterProduct = allProducts.filter((product) => {
                return product.name.toLowerCase().includes(value.toLowerCase())
            })
        } else {
            filterProduct = allProducts;
        }

        if (!(optionSelected.value === undefined)) {
            filterProduct = filterProduct.filter(product => {
                return product.productCategory.name === optionSelected.value
            })
        }
        setFilteredProducts(filterProduct)
    }

    function clearData() {
        sessionStorage.clear();
    }

    function showProductType(type) {
        switch (type) {
            case "FOOD":
                return "Food";
            case "DRINK":
                return "Drink"
        }
    }

    return (
        <>
            <h1>Product overview</h1>
            <div className={"wrapper"}>
                <div className={"filter-div"}>
                    <h2>Filters</h2>
                    <input className={"search-bar"} ref={ref} placeholder={"Search"} name={"search"}
                           onChange={handleChange}/>
                    <DropdownFilter options={getAllCategoryOptions()}
                                    setOptionSelected={(selected) => setOptionSelected(selected)}
                                    optionSelected={optionSelected}/>
                </div>

                <div className={"search-table"}>
                    <OverviewTable tableHeads={["name", "type", "category", "price", "details"]}
                                   items={filteredProducts} handleClick={id => navigate(`/productdetails/${id}`)}
                                   leaveOutList={["ingredients", "productDestination", "id", "imagePath"]}
                                   specialDisplays={new Map([["productCategory", (category) => category.name], ["productType", (type) => showProductType(type)]])
                                   }/>
                </div>
            </div>

            <HomeNav/>
            <div className={"navigation-buttons"}>
                <Link to="/createproduct" className="button search-products-navigation">Create product</Link>
                <Link to="/staff" className="button search-products-navigation" onClick={() => {
                    clearData()
                }}>Log out</Link>
            </div>
        </>
    )
}
