import React, {useEffect, useState} from "react";
import {getAllOrdersByDateExact, getAllOrdersByDateRange, getAllOrdersOfToday} from "../../urlMappings/OrderRequests";
import DatePicker from "react-multi-date-picker";
import getOccurrenceProducts, {displayPrice} from "../utils/Util";
import "../../styles/AllOrders.css"
import "../../styles/SearchTable.css"
import HomeNav from "../utils/Homebutton";
import DropdownFilter from "../product/DropdownFilter";


export default function OrderStatistiekenOverview(props) {
    let allOrders = [];
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [values, setValues] = useState();
    let price = 0;
    const [datepickerMode,setDatepickerMode] = useState(" exact");

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;


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

    function dateChanged(value) {
        setValues(value);
        console.log(value)
        // console.log(values[0].format("YYYY-MM-DD"), values[1].format("YYYY-MM-DD"))
    }

    useEffect(() => {

    }, [datepickerMode])

    function fillProductList(list) {
        let productsList = []
        list.map(order => {
            order.products.map(product => {
                productsList.push(product)
            })
        })
        return productsList;
    }


    function filter() {
        if (values.length === 1){
            getAllOrdersByDateExact(values[0].format("YYYY-MM-DD"))
                .then(res=> setFilteredOrders(res))
        }else if (values.length === 2){
            getAllOrdersByDateRange(values[0].format("YYYY-MM-DD"), values[1].format("YYYY-MM-DD"))
                .then(res => setFilteredOrders(res))
        }
    }

    function testff(selected){
        console.log(selected)
        setDatepickerMode(selected.value)
        console.log(selected.value === " exact")
    }

    return (
        <>
            <h1>Bestelling overzicht</h1>
            <div className={"wrapper"}>
                <div className={"filter-div"}>
                    <h2>Filter</h2>
                    {/*<DropdownFilter options={[{value: " exact", label: "exact"},{value: " range", label: "range"}]}*/}
                    {/*                setOptionSelected={(selected) => testff(selected)}*/}
                    {/*                optionSelected={datepickerMode}/>*/}
                    {/*{datepickerMode === " exact" ? (*/}
                    {/*    <DatePicker onChange={value => dateChanged(value)} placeholder={today}*/}
                    {/*                       className={"datepicker"}/>*/}
                    {/*) : (*/}
                    {/*    <DatePicker onChange={value => dateChanged(value)} range placeholder={today}*/}
                    {/*    className={"datepicker"}/>)}*/}
                    <DatePicker onChange={value => dateChanged(value)} range placeholder={today}
                                className={"datepicker"}/>

                    <div className={"overview-request"}>
                        <button className={"button"} onClick={() => filter()}>Overzicht opvragen</button>
                    </div>
                </div>

                <table className="search-table" id={"revenue-table"}>
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
                                        <td>€ {displayPrice(Array.from(getOccurrenceProducts(fillProductList(filteredOrders)).values())[index] * product.price)}</td>
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
        </>


    )


}