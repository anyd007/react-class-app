import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Lessons from "./components/Lessons";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Login from "./components/Login";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Lessons />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
