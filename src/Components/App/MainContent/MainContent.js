import React from "react";
import MovieElement from "./MovieElement/MovieElement";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import "./MainContent.scss";

const MainContent = (props) => {
  if (props.movies.length > 0) {
    return (
      <div className="mainContent">
        {props.movies.map((movie, index) => {
          return <MovieElement key={index} movie={movie} />;
        })}
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default MainContent;
