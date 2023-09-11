import React from "react";
import "./Movie.css"
const Movie = (props)=>{
    return(
        <div className="div">
        <li className="movie-data">
            <h1 className="title">{props.title}</h1>
            <h3 className="date">{props.releaseDate}</h3>
            <p>{props.openingText}</p>
        </li>
        </div>
    )
}

export default Movie;