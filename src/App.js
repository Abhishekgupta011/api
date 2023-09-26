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

  const retryingRef = useRef(retrying);
  const retryTimerRef = useRef(null);

  const handleFetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://react-api12-default-rtdb.firebaseio.com/movies.json');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingtext: data[key].openingtext,
          date: data[key].date,
        });
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const handleCancelRetry = useCallback(() => {
    setRetrying(false);
    setError(null);

    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }
  }, []);

  const handleError = (error) => {
    console.error('Error:', error);
    setIsLoading(false);

    if (retryingRef.current) {
      setError('Something went wrong... Retrying');

      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }

      retryTimerRef.current = setTimeout(() => {
        handleFetchMovies();
      }, 5000);
    } else {
      setError('Failed to fetch movies. Please try again later.');
    }
  };

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  const handleAddMovie = async (newMovieObj) => {
    console.log('Adding movie:', newMovieObj);
    try {
      const response = await fetch('https://react-api12-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        body: JSON.stringify(newMovieObj),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add the movie.');
      }

      const data = await response.json();

      setMovies((prevMovies) => [
        ...prevMovies,
        {
          id: data.name,
          ...newMovieObj,
        },
      ]);

      console.log('New movie added:', data);
    } catch (error) {
      handleError(error);
    }
  };
  const deleteMovieHandler = async (id) => {
    console.log("hbbj")
    try {
      const response = await fetch(`https://react-api12-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the movie.');
      }

      // Update the UI by removing the deleted movie from the moviesList state
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className="App">
      <Form onAddMovie={handleAddMovie} />
      <Button onClick={handleFetchMovies} className="fetch">
        Fetch movies
      </Button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && <MovieList movies={moviesList}
      onDeleteMovie={deleteMovieHandler} />}
      {retrying && <Button onClick={handleCancelRetry}>Cancel</Button>}
    </div>
  );
}

export default App;
