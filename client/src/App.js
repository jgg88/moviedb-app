import React, { Component } from 'react';
import './App.css';
import NewReleases from './Components/NewReleases';
import Search from './Components/Search';
import MovieInfo from './Components/MovieInfo';

class App extends Component {
  state = {
    searchResults: ''
  }

  updateSearchResults = (results) => {
    this.setState({searchResults: results });
    console.log(this.state.searchResults)
  }

  render() {
    const {searchResults} = this.state;
    return (
      <div className="App">
        <Search updateSearchResults={this.updateSearchResults}/>
        {searchResults === '' && <NewReleases/>}
        {searchResults !== '' && <MovieInfo results={searchResults}/>}
      </div>
    );
  }
}

export default App;
