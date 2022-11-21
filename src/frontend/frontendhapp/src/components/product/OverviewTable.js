import React from "react";


export default function OverviewTable(props){
    return(
        <span className={"product-tables"}>
            <table id="searchTable">
                <tbody key={"table-body"}>
                    <tr>
                        {props.tableHeads.map(head => {
                            return <th key={head}>{head}</th>
                        })}
                    </tr>
                </tbody>

                {props.items.map((item, i) => {
                    return <tbody key={"body" + i}>
                        <tr key={item.id} onClick={() => props.handleClick(item.id)}>
                            {Object.keys(item).map((itemKey,i) => {
                                if (props.leaveOutList.indexOf(itemKey) === -1){
                                    if (!(props.specialDisplays === undefined)){
                                        if (Array.from(props.specialDisplays.keys()).indexOf(itemKey) === -1){
                                            return <td key={item[itemKey] + i}>{item[itemKey]}</td>
                                        }else{
                                            const showCategory=props.specialDisplays.get(itemKey)

                                            return <td key={item[itemKey] + i}>{showCategory(item[itemKey])}</td>

                                        }
                                    }else{
                                        return <td key={item[itemKey] + i}> {item[itemKey]}</td>
                                    }

                                }

                            })}
                        </tr>
                    </tbody>
                })}
            </table>
        </span>
    )
}