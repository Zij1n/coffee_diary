import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NoPage from "./NoPage.js";
import Create from "./Create/Create.js";
import Home from "./Home/Home.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
