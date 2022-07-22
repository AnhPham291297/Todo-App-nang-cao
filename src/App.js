import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
