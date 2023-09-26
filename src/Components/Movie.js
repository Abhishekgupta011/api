import React from "react";
import "./Movie.css";
import Button from "./Button";

const Movie = (props) => {
  const handleDeleteClick = () => {
    // Trigger the onDeleteMovies function and pass the movie id
    props.onDeleteMovie(props.id);
  };

  return (
    <div className="div">
      <li className="movie-data">
        <h1 className="title">{props.title}</h1>
        <h3 className="date">{props.releaseDate}</h3>
        <p>{props.openingText}</p>
        <Button onClick={handleDeleteClick}>Delete</Button>
      </li>
    </div>
  );
};

export default Movie;
