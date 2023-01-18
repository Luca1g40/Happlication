import React from "react";
import {components, default as ReactSelect} from "react-select";

export default function DropdownFilter(props) {


    const Option = (props) => {
        return (
            <>
                <components.Option {...props} className={"select-options"}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={(change) => {
                            console.log(change.target.name)
                        }}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </>
        );
    };
    const handleChange = (selected) => {
        if (!(selected.value.localeCompare(props.optionSelected.value))) {
            props.setOptionSelected([])
        } else {
            props.setOptionSelected(selected);
        }

    };

    return (
        <ReactSelect
            style={"backgroundColor: 'white'"}
            options={props.options}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option
            }}
            onChange={handleChange}
            allowSelectAll={true}
            value={props.optionSelected}
        />
    )

}
