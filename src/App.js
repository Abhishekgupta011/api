import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './Components/MovieList';
import Button from './Components/Button';

function App() {
  const [moviesList, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieHandler = async () => {
    try {
      setIsLoading(true); // Set isLoading to true when fetching data
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        release: movieData.release_date,
        openingText: movieData.opening_crawl,
      }));

      setMovies(transformedMovies);
      setIsLoading(false); // Set isLoading to false when data is fetched
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };

  useEffect(() => {
    // Fetch movies when the component mounts
    fetchMovieHandler();
  }, []); // Empty dependency array to ensure it runs once

  return (
    <div className="App">
      <Button onClick={fetchMovieHandler}>Fetch movies</Button>
      {isLoading && <h3 className='loader'>Loading...</h3>} {/* Display loading message while isLoading is true */}
      {!isLoading && <MovieList movies={moviesList} />}
    </div>
  );
}

export default App;
