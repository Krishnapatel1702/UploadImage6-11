import "./App.css";
import RoutesDom from "./RoutesDom";
import { redirect, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <RoutesDom />
      </Router>
    </>
  );
}

export default App;
