import React from "react";
import {Route, Routes} from "react-router-dom";

import Drinks from "../src/Component/Drinks";
import Foods from "../src/Component/Foods";
import Home from "../src/Component/Home";
import "../../frontendhapp/src/Home.css"

function App() {
  return(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Drinks" element={<Drinks />} />
            <Route path="Foods" element={<Foods />} />
            <Route path="test" element={<test />} />

          </Routes>
  )

}

export default App;
