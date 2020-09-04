import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import "./TableElement.scss";

const TableElement = (props) => {
  const [planetsAPIs] = useState(props.planets);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    planetsAPIs.forEach((planetAPI) => {
      fetch(planetAPI)
        .then((resp) => resp.json())
        .then((data) =>
          setPlanets((prevState) => {
            return [...prevState, data];
          })
        );
    });
  }, []);

  const sortAsc = (by) => {
    let toSort = [...planets];
    let sorted = toSort.sort((a, b) => {
      if (a[by] < b[by]) {
        return -1;
      }
      if (a[by] > b[by]) {
        return 1;
      } else {
        return 0;
      }
    });
    setPlanets(sorted);
  };
  const sortDesc = (by) => {
    let toSort = [...planets];
    let sorted = toSort.sort((a, b) => {
      if (a[by] < b[by]) {
        return 1;
      }
      if (a[by] > b[by]) {
        return -1;
      } else {
        return 0;
      }
    });
    setPlanets(sorted);
  };
  const sortByNumberAsc = (by) => {
    let toSort = [...planets];
    let sorted = toSort.sort((a, b) => {
      if (a[by] === "unknown") {
        return 1;
      } else if (b[by] === "unknown") {
        return -1;
      } else if (parseFloat(a[by]) < parseFloat(b[by])) {
        return -1;
      } else if (parseFloat(a[by]) > parseFloat(b[by])) {
        return 1;
      } else {
        return 0;
      }
    });
    setPlanets(sorted);
  };
  const sortByNumberDesc = (by) => {
    let toSort = [...planets];
    let sorted = toSort.sort((a, b) => {
      if (a[by] === "unknown") {
        return 1;
      } else if (b[by] === "unknown") {
        return -1;
      } else if (parseFloat(a[by]) < parseFloat(b[by])) {
        return 1;
      } else if (parseFloat(a[by]) > parseFloat(b[by])) {
        return -1;
      } else {
        return 0;
      }
    });
    setPlanets(sorted);
  };

  if (planets.length === planetsAPIs.length) {
    return (
      <div className="tableElement">
        <table>
          <thead>
            <tr>
              <th>
                Planet
                <br /> Name
                <button onClick={() => sortAsc("name")}></button>
                <button onClick={() => sortDesc("name")}></button>
              </th>
              <th>
                Rotation
                <br /> Period
                <button
                  onClick={() => sortByNumberAsc("rotation_period")}
                ></button>
                <button
                  onClick={() => sortByNumberDesc("rotation_period")}
                ></button>
              </th>
              <th>
                Orbital
                <br /> Period
                <button
                  onClick={() => sortByNumberAsc("orbital_period")}
                ></button>
                <button
                  onClick={() => sortByNumberDesc("orbital_period")}
                ></button>
              </th>
              <th>
                Diameter
                <button onClick={() => sortByNumberAsc("diameter")}></button>
                <button onClick={() => sortByNumberDesc("diameter")}></button>
              </th>
              <th>
                Climate
                <button onClick={() => sortAsc("climate")}></button>
                <button onClick={() => sortDesc("climate")}></button>
              </th>
              <th>
                Surface
                <br /> Water
                <button
                  onClick={() => sortByNumberAsc("surface_water")}
                ></button>
                <button
                  onClick={() => sortByNumberDesc("surface_water")}
                ></button>
              </th>
              <th>
                Population
                <button onClick={() => sortByNumberAsc("population")}></button>
                <button onClick={() => sortByNumberDesc("population")}></button>
              </th>
            </tr>
          </thead>
          <tbody>
            {planets.map((planet, index) => {
              return (
                <tr key={index}>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default TableElement;
