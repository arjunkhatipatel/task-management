import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Component/About";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exct path="/" element={<Home />} />
        <Route exact path={"/about"} element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
