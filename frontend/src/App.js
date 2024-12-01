import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./components/home";

function App() {
  return (
    <div className="App main">
      <div className="shade">
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
