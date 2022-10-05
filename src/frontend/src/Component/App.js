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
                <div className="welkom">Welkom</div>

                <Link className="button drankjes" to="Drinks">Dranken</Link>

                <Link className="button gerechten" to="Foods">Gerechten</Link>

            </div>

              <div>
              </div>

            <Routes>
                <Route path="Drinks" element={<Drinks />} />
                <Route path="Foods" element={<Foods />} />
            </Routes>
        </Router>
  </>
  );
}

export default App;
