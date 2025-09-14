import { Route, Routes } from "react-router";
import Home from "./home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="home" Component={Home}/>
    </Routes>
  );
}

export default App
