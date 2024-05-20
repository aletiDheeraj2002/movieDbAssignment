import React from 'react';
import './index.css'

const MovieCard = ({ movie }) => {
  const { title, overview, release_date, vote_average, poster_path } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} />
      <div className="movie-details">
        <h2>{title}</h2>
        <p>{overview}</p>
        <p><strong>Release Date:</strong> {release_date}</p>
        <p><strong>Vote Average:</strong> {vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;
