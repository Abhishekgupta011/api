import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [moviesList, setMovies] = useState([]);

  const fetchMovieHandler = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch movies when the component mounts
    fetchMovieHandler();
  }, []); // Empty dependency array to ensure it runs once

  return (
    <div className="App">
      <button onClick={fetchMovieHandler}>Fetch movies</button>
      <ul>
        {moviesList.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
