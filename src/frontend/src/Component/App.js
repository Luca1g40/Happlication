import React from "react";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Drinks from "./Drinks";
import Foods from "./Foods";
import Modal from "./Modal";
import "../Home.css"

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
        </Router>

          <Router>
              <div>
                  <Link className="button gerechten" to="Foods">Gerechten</Link>
              </div>

              <Routes>
                  <Route path="Foods" element={<Foods />} />
              </Routes>
          </Router>
  </>
  );
}

export default App;
