import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import MovieList from './Components/MovieList';
import Button from './Components/Button';
import Form from './Components/Form';

function App() {
  const [moviesList, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(true);

  // Define retryingRef outside of the component
  const retryingRef = useRef(retrying);

  // Create a retry timer ref
  const retryTimerRef = useRef(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
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
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      const retryMessage = `Something went wrong... Retrying`;
      setError(retryMessage);
      if (retryingRef.current) {
        // Clear the previous retry timer
        if (retryTimerRef.current) {
          clearTimeout(retryTimerRef.current);
        }
        // Schedule a new retry timer
        retryTimerRef.current = setTimeout(fetchMovies, 5000);
      }
    }
  }, []);

  const cancelRetry = useCallback(() => {
    setRetrying(false);
    setError(null);
    // Clear the retry timer when canceling retry
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }
  }, []);
  const addMovieHandler= (newMovieObj)=>{
    console.log(newMovieObj)
  }
  
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="App">
      <Form onAddMovie={addMovieHandler}/>
      <Button onClick={fetchMovies} className="fetch">Fetch movies</Button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && <MovieList movies={moviesList} />}
      {retrying && <Button onClick={cancelRetry}>Cancel</Button>}
    </div>
  );
}

export default App;
