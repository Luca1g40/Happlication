import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Dashboard from "./guest_components/Dashboard";

function App() {
  return (
      <>
        <Router>
          <Dashboard/>

        </Router>

        <div className="App">

        </div>

      </>
  );
}

export default App;
