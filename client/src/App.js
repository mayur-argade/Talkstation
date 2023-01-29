import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Protected Routes
import SemiProtected from "./Utils/SemiProtected";
import GuestRoute from "./Utils/GuestRoute";
// import Protected from "./Utils/Protected";

// Pages
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>

        <Route path="/" element={<GuestRoute Component={Home} />} />
        
        <Route path="/authenticate" element={<GuestRoute Component={Authenticate} />}/>
        
        <Route path="/activate" element={<SemiProtected Component={Activate} />} />
      
      </Routes>
    </Router>
  );
}

export default App;
