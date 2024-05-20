import React, { Component } from 'react';
import MovieList from '../MovieList';
import './index.css';

class UpcomingPage extends Component {
  state = {
    movies: [],
    currentPage: 1,
    totalPages: 1,
  };

  componentDidMount() {
    this.fetchUpcomingMovies(this.state.currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchUpcomingMovies(this.state.currentPage);
    }
  }

  fetchUpcomingMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=001a9328866634851582ce672c31e5fd&language=en-US&page=${page}`
    );
    const data = await response.json();
    this.setState({ movies: data.results, totalPages: data.total_pages });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { movies, currentPage, totalPages } = this.state;

    return (
      <div className="upcoming-page">
        <h1>Upcoming Movies</h1>
        <MovieList movies={movies} />
        <div className="pagination">
          <button
            onClick={() => this.handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => this.handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default UpcomingPage;
