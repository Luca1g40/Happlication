import React from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

export default function DropdownFilter(props){
    const categoryOptions = [
        { value: "MAIN_COURSE", label: "Main course" },
        { value: "DESSERT", label: "Dessert" },
        { value: "SIDE", label: "Side" },
        { value: "DRINKS", label: "Drink" },
        { value: "EXTRA", label: "Extra" },
        { value: "STARTER", label: "Starter" }
    ];
    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };
    const handleChange = (selected) => {
        props.setOptionSelected(selected);
    };

    return(
        <ReactSelect
            options={categoryOptions}

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
