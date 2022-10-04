import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Drinks from "./Drinks";




function Home() {
    const DrinksPage = () => {
        window.location.href = "localhost:3000/drankjes.html";
    }

    const handleClickAgain = (name, e) => {
        console.log('hello ' + name, e.target);
    }
    return(
        <>

                <div className="App">
                    <div className="welkom">Welkom</div>

                    <button className="button drankjes" onClick={DrinksPage}>Drankjes</button>
                    <button className="button gerechten">Gerechten</button>
                </div>

        < />
    )
}

export default Home;
