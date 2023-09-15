import React from "react";
import Movie from "./Movie";
import "./MovieList.css"
const MovieList = (props) =>{
    return(
        <div className="list">
            <ul className="movie-list">
                {props.movies.map(movie=>(
                    <Movie
                        key = {movie.id}
                        title={movie.title}
                        releaseDate={movie.release}
                        openingText={movie.openingText}
                />
                ))}
                
            </ul>
        </div>
    )
}

export default MovieList;