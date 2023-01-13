import React, {useEffect, useState} from "react";
import {getAllOrdersByDateRange, getAllOrdersOfToday} from "../../../urlMappings/OrderRequests";
import DatePicker from "react-multi-date-picker";
import getOccurrenceProducts, {displayPrice} from "../../utils/Util";
import  "../../../styles/AllOrders.css"
import {Link} from "@material-ui/core";
import "../../../styles/SearchTable.css"
import HomeNav from "../../utils/Homebutton";




export default function OrderStatistiekenOverview(props){
    let allOrders = []
    const [filteredOrders,setFilteredOrders] = useState([])
    const [values, setValues] = useState()
    let price = 0;


    useEffect(() => {

        getAllOrdersOfToday()
            .then(res => {
                allOrders = res;
                setFilteredOrders(allOrders)
            })
            .then(err => {
                console.log(err);
            });

    }, [])

    function dateChanged(value){
        setValues(value);
        console.log(values[0].format("YYYY-MM-DD"),values[1].format("YYYY-MM-DD"))
    }

    function fillProductList(list){
        let productsList =[]
        list.map(order => {
            order.products.map(product => {
                productsList.push(product)
            })
        })
        return productsList;
    }


    function filter(){
        getAllOrdersByDateRange(values[0].format("YYYY-MM-DD"),values[1].format("YYYY-MM-DD"))
            .then(res => setFilteredOrders(res))
    }



    return(
        <>
            <h1>Bestelling overzicht</h1>
            <div className={"wrapper"}>

                <div className={"filter-div"}>

                <DatePicker onChange={value=>dateChanged(value)} range/>

                <div >
                    <button className={"button"} onClick={()=>filter()}>Overzicht opvragen</button>
                </div>

                </div>




            <table className="search-table">
                <tbody key={"table-body"}>
                    <tr>
                       <th>Name</th>
                       <th>Hoeveelheid</th>
                       <th>Omzet</th>
                    </tr>
                </tbody>
                {
                    Array.from(getOccurrenceProducts(fillProductList(filteredOrders)).keys()).map((product, index) => {
                        price = price + (product.price * Array.from(getOccurrenceProducts(fillProductList(filteredOrders)).values())[index]);

                        return (
                            <tr>
                                <td>{product.name}</td>
                                <td>{Array.from(getOccurrenceProducts(fillProductList(filteredOrders)).values())[index]} </td>
                                <td>€ {displayPrice(Array.from(getOccurrenceProducts(fillProductList(filteredOrders)).values())[index] * product.price )}</td>
                            </tr>
                            )
                        }
                    )
                }
                <tr className={"total-amount"}>
                    <td>Totaal omzet</td>
                    <td/>
                    <td>€ {displayPrice(price)}</td>
                </tr>
            </table>
            </div>
            <HomeNav/>


            <div className={"navigation-buttons"}>
                <Link to="/createproduct" className="button search-products-navigation" >Create product</Link>
            </div>
        </>


    )




}