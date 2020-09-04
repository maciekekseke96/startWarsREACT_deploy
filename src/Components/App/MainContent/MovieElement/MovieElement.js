import React, { useState } from "react";
import TableElement from "./TableElement/TableElement";
import "./MovieElement.scss";

const MovieElement = (props) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <div className="movieElement">
        <p className="movieTitle">{props.movie.title}</p>
        <div className="wrapBtn" onClick={() => setIsShown(!isShown)}></div>
      </div>
      {isShown && <TableElement planets={props.movie.planets} />}
    </>
  );
};

export default MovieElement;
