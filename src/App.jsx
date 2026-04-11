import "./App.css";
import Home from "./pages/home/Home";
import Elements from "./pages/elements/Elements"
import AboutUs from "./pages/aboutus/AboutUs"
import ArtemisII from "./pages/artemisII/ArtemisII"
import Legal from "./pages/legal/Legal"
import Terms from "./pages/legal/Terms"
import NotFound from "./pages/notfound/Notfound"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/artemisII" element={<ArtemisII />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
