import React from "react";


export default function OverviewTable(props){


    return(
        <span className={"product-tables"}>
            <table id="searchTable">
                <tr>
                    {props.tableHeads.map(head=>{
                        return <th>{head}</th>
                    })}
                </tr>

                {props.items.map(item=>{
                    return <tr key={item.id} onClick={()=>props.navigate(item.id)}>
                        {Object.keys(item).map((itemKey,i)=>{
                            if (props.leaveOutList.indexOf(itemKey)===-1){
                                if (Array.from(props.specialDisplays.keys()).indexOf(itemKey)===-1){
                                    return <td>{item[itemKey]}</td>
                                }else{
                                    const showCategory=props.specialDisplays.get(itemKey)

                                    return <td>{showCategory(item[itemKey])}</td>

                                }
                            }

                        })}
                    </tr>
                })}
            </table>
        </span>
    )
}