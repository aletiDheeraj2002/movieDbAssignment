import React, { Component } from 'react';
import './index.css';

class MovieDetailPage extends Component {
  state = {
    movie: null,
    cast: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovieDetails(id);
    this.fetchMovieCast(id);
  }

  fetchMovieDetails = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=001a9328866634851582ce672c31e5fd&language=en-US`
    );
    const data = await response.json();
    this.setState({ movie: data });
  };

  fetchMovieCast = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=001a9328866634851582ce672c31e5fd&language=en-US`
    );
    const data = await response.json();
    this.setState({ cast: data.cast });
  };

  render() {
    const { movie, cast } = this.state;

    if (!movie) return <div>Loading...</div>;

    return (
      <div className="movie-detail-page">
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
        <h2>Cast</h2>
        <div className="cast-list">
          {cast.map((member) => (
            <div key={member.cast_id} className="cast-member">
              <img
                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                alt={member.name}
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MovieDetailPage;
