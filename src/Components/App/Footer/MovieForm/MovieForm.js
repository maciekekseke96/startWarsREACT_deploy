import React, { useState } from "react";
import "./MovieForm.scss";

const MovieFormContainer = (props) => {
  return (
    <div className="movieFormContainer">
      <MovieForm setStarWarsMovies={props.setStarWarsMovies} />
    </div>
  );
};

const MovieForm = (props) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [planetSearcher, setPlanetSearcher] = useState("");
  const [planetsFound, setPlanetsFound] = useState([]);
  const [planetsChoosen, setPlanetsChoosen] = useState([]);
  const [titleError, setTitleError] = useState(false);

  const choosePlanet = (planet) => {
    setPlanetsChoosen((prevstate) => {
      return [...prevstate, planet];
    });
    setPlanetSearcher("");
    setPlanetsFound([]);
  };

  const deletePlanet = (index) => {
    setPlanetsChoosen(
      planetsChoosen.filter((planet, i) => {
        return i !== index;
      })
    );
  };

  const addMovie = (event) => {
    event.preventDefault();
    if (
      titleError === false &&
      planetsChoosen.length > 0 &&
      movieTitle.length > 2
    ) {
      let planetsAPIs = [];
      planetsChoosen.forEach((planet) => {
        planetsAPIs.push(planet.url);
      });
      const filmObject = {
        title: movieTitle,
        planets: planetsAPIs,
      };
      props.setStarWarsMovies((prevstate) => {
        return [...prevstate, filmObject];
      });
      setPlanetsChoosen([]);
      setPlanetsFound([]);
      setMovieTitle("");
      setPlanetSearcher("");
    } else {
      alert(
        "Let's check your title (at least 3 characters) or choose some planets!"
      );
    }
  };
  let btnStyles = {
    position: "absolute",
    right: "50px",
    bottom: "25px",
    width: "120px",
    height: "40px",
    fontFamily: '"Ubuntu", sans-serif',
    color: "white",
    border: "none",
    borderRadius: "10%",
  };
  if (
    titleError === false &&
    planetsChoosen.length > 0 &&
    movieTitle.length > 2
  ) {
    btnStyles = {
      ...btnStyles,
      backgroundColor: "#1BA1BE",
    };
  } else {
    btnStyles = {
      ...btnStyles,
      backgroundColor: "rgb(212, 206, 206)",
    };
  }
  return (
    <form className="movieForm">
      <label className="specific">
        Movie title
        {titleError && <ErrorHandler />}
      </label>
      <input
        onChange={(event) => {
          setMovieTitle(event.target.value);
        }}
        onKeyUp={() => {
          if (
            movieTitle.length > 0 &&
            movieTitle[0] !== movieTitle[0].toUpperCase()
          ) {
            setTitleError(true);
          } else {
            setTitleError(false);
          }
        }}
        type="text"
        value={movieTitle}
        placeholder="Type the title of your movie"
      ></input>
      {PlanetsChoosen.length > 0 && (
        <PlanetsChoosen deletePlanet={deletePlanet} planets={planetsChoosen} />
      )}
      <label className="specific">
        Add planet
        {planetsFound.length > 0 && (
          <PlanetsFound choosePlanet={choosePlanet} planets={planetsFound} />
        )}
      </label>
      <input
        value={planetSearcher}
        onChange={(event) => {
          setPlanetSearcher(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.target.value.length > 0) {
            fetch(`https://swapi.dev/api/planets/?search=${event.target.value}`)
              .then((resp) => resp.json())
              .then((data) => setPlanetsFound(data.results));
          } else {
            setPlanetsFound([]);
          }
        }}
        type="text"
        placeholder="Let's search for your planet"
      ></input>
      <button style={btnStyles} onClick={(event) => addMovie(event)}>
        Add Movie
      </button>
    </form>
  );
};

const PlanetsChoosen = (props) => {
  return (
    <div className="planetsChoosen">
      {props.planets.map((planet, index) => {
        return (
          <div key={index} className="planet">
            {planet.name}
            <div onClick={() => props.deletePlanet(index)}>X</div>
          </div>
        );
      })}
    </div>
  );
};

const PlanetsFound = (props) => {
  return (
    <div className="planetsFound">
      {props.planets.map((planet, index) => {
        return (
          <div
            onClick={() => props.choosePlanet(planet)}
            key={index}
            className="planet"
          >
            {planet.name}
          </div>
        );
      })}
    </div>
  );
};

const ErrorHandler = () => {
  return (
    <div className="error">
      Movie title name must start with a capital letter.
    </div>
  );
};

export default MovieFormContainer;
