import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import TopRatedPage from './components/TopRatedPage';
import UpcomingPage from './components/UpcomingPage';
import MovieDetailPage from './components/MovieDetailPage';

function App() {
  return (
    <div className="App">
      < BrowserRouter >
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/top-rated" component={TopRatedPage} />
        <Route path="/upcoming" component={UpcomingPage} />
        <Route path="/movie/:id" component={MovieDetailPage} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;