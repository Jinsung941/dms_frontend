import Chat from "./Chat";
import Home from "./page/Home";
import Archived from "./page/Archived";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/archived" element={<Archived />} />
    </Routes>
  );
}

export default App;
