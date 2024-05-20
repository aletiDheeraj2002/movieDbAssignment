import React, { Component } from 'react';
import MovieList from '../MovieList';
import Navbar from '../Navbar';
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      query: '',
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.query !== this.state.query) {
      this.fetchMovies();
    }
  }

  fetchMovies = async () => {
    const { page, query } = this.state;
    const apiKey = '001a9328866634851582ce672c31e5fd';
    let apiEndpoint;

    if (query) {
      apiEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`;
    } else {
      apiEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    }

    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      this.setState({ movies: data.results });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  handlePreviousPage = () => {
    this.setState((prevState) => ({ page: prevState.page - 1 }));
  }

  handleNextPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  }

  handleSearch = () => {
    // Optionally, you can add additional logic here such as clearing previous search results
    // or resetting pagination when the search button is clicked.
    // For now, we'll let the search trigger the componentDidUpdate to fetch new results.
  }

  render() {
    const { movies, page, query } = this.state;

    return (
      <div className="container">
        <Navbar />
        <h1 className="title">{query ? `Search Results for "${query}"` : 'Popular Movies'}</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <MovieList movies={movies} />
        <div className="pagination">
          <button onClick={this.handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <button onClick={this.handleNextPage}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
