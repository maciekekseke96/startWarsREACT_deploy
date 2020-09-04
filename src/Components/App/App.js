import React, { useState, useEffect } from "react";
import "./App.scss";
import Header from "./Header/Header";
import MainContent from "./MainContent/MainContent";
import Footer from "./Footer/Footer";

function App() {
  const [starWarsMovies, setStarWarsMovies] = useState([]);
  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((resp) => resp.json())
      .then((data) => {
        setStarWarsMovies(data.results);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent movies={starWarsMovies} />
      <div className="slicer"></div>
      <Footer setStarWarsMovies={setStarWarsMovies} />
      <div className="copyright">
        <p>COPYRIGHT &copy; 2020 MIRUMEE SOFTWARE</p>
      </div>
    </div>
  );
}

export default App;
