import React from "react";
import {Link} from "react-router-dom";

import "../styles/Foods.css"
import "../styles/Home.css"


export default function Foods() {
    return (
        <>
            <div>
                <Link className="button foodsToHome" to="/"> home </Link>
            </div>
        </>
    );
}
