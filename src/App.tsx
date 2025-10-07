import { Route, Routes } from "react-router";
import Home from "./home/Home";
import styles from './App.module.css'
import { useEffect, useState } from "react";
import icons from "./assets/icons.svg";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
      document.body.setAttribute("data-theme", theme);
  }, [theme]);


  function toggleTheme(){
    setTheme(theme => theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  }

  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="home" Component={Home} />
      </Routes>
      <button type="button" className={styles["btn-theme"]} onClick={toggleTheme}>
        <svg viewBox="0 0 1024 1024">
          <use href={`${icons}#${theme === "dark" ? "dark-theme" : "light-theme"}`}/>
        </svg>
      </button>
    </>
  );
}

export default App
