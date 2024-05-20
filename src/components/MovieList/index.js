import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const MovieList = ({ movies }) => {
  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
