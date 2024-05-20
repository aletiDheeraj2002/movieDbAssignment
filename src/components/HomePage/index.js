import React, { Component } from 'react';
import MovieList from '../MovieList';

import './index.css'

const Loader = () => (
    <div className="loader"></div>
  );

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      query: '',
      currentPage: 1,
    totalPages: 1,
    searchQuery: '',
    loading: false,
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

    this.setState({ loading: true });

    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      this.setState({ movies: data.results,totalPages: data.total_pages },()=>{
        this.setState({ loading: false })
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page,page:page });
  };


  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  handleSearch = () => {
    this.setState({ query: this.state.searchQuery, page: 1, currentPage: 1 }, () => {
      this.fetchMovies();
    });
  }
  render() {
    const { movies, searchQuery ,currentPage,
        totalPages,loading} = this.state;

    return (
      <div className="container">
       
       
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        {loading ? <Loader /> : <MovieList movies={movies} />}
        
       
        <div className="pagination-cont">
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
        
      </div>
    );
  }
}

export default Home;
