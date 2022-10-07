import React from "react";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Drinks from "../src/Component/Drinks";
import Foods from "../src/Component/Foods";
import test from "../src/Component/test"
import Modal from "../../frontendhapp/src/Component/Modal";
import "../../frontendhapp/src/Home.css"

const App = () => {
  return (
      <>
        <Router>
          <div>
            <Link className="button drankjes" to="Drinks">Dranken</Link>
          </div>


          <Routes>
            <Route path="Drinks" element={<Drinks />} />
          </Routes>

          <div>
            <Link className="button gerechten" to="Foods">Gerechten</Link>
          </div>

          <Routes>
            <Route path="Foods" element={<Foods />} />
          </Routes>


          <div>
            <Link to="test">sdfsdfsdf</Link>
          </div>

          <Routes>
            <Route path="test" element={<test />} />
          </Routes>

        </Router>
      </>
  );
}

export default App;
