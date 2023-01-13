import OverviewTable from "../product/OverviewTable";
import HomeNav from "../utils/Homebutton";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {getAllCategories} from "../../urlMappings/MenuRequests";

export default function SearchCategory() {
    const [allCategories, setAllCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])
    const ref = useRef();
    let navigate = useNavigate()

    useEffect(() => {
        getAllCategories()
            .then(res => {
                setAllCategories(res)
                setFilteredCategories(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    function handleChange() {
        const value = ref.current.value
        let filteredCategoryList = []
        if (value.trim().length > 0) {
            filteredCategoryList = allCategories.filter((product) => {
                return product.name.toLowerCase().includes(value.toLowerCase())
            })
        } else {
            filteredCategoryList = allCategories;
        }

        setFilteredCategories(filteredCategoryList)
    }

    return (

        <>
            <h1>Product overview</h1>
            <div className={"wrapper"}>
                <div className={"filter-div"}>

                    <h2>Filters</h2>
                    <input className={"search-bar"} ref={ref} placeholder={"Search"} name={"search"}
                           onChange={handleChange}/>
                </div>

                <div className={"search-table"}>

                    <OverviewTable tableHeads={["name"]} items={filteredCategories}
                                   handleClick={id => navigate(`/categorydetails/${id}`)} leaveOutList={["id"]}
                                   specialDisplays={new Map([])
                                   }/>
                </div>
            </div>

            <HomeNav/>


            <div className={"navigation-buttons"}>
                <Link to="/createcategory" className="button search-products-navigation">Create category</Link>
                {/*<Link to="/staff" className="button search-products-navigation" onClick={() => {clearData()}}>Log out</Link>*/}
            </div>


        </>
    )

}