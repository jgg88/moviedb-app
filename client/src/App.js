import React, { Component } from 'react';
import './App.css';
import {key} from './config/keys';
import axios from 'axios';
import NewReleases from './Components/NewReleases';
import Search from './Components/Search';
import MovieInfo from './Components/MovieInfo';

class App extends Component {
  state = {
    title: '',
    results: [],
    hasFetchedTitle: false,
    totalPages: [],
    currentPage: 1
  }

  updateResults = (input) => {
    if (input === '') {
      this.setState({hasFetchedTitle: false})
    }
  }

  searchMovieDb = (title, pageNumber = 1) => {
    let formattedTitle = [];
    title.split('').forEach(letter => {
        if (letter !== ' ') {
            formattedTitle.push(letter);
        } else {
            formattedTitle.push('+');
        }
    });
    title = formattedTitle.join('');
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${title}&page=${pageNumber}`;
    axios.get(url)
        .then(res =>  {
            let sortedResults = res.data.results.sort(this.sortDate);
            let seasonArray = Array.from({length: res.data.total_pages}, (v, i) => i+1);
            this.setState({
              results: sortedResults, 
              title: title, 
              hasFetchedTitle: true,
              totalPages: seasonArray,
              currentPage: pageNumber
            })
        })
        .catch(err => console.log(err));
  }

  searchForShows = (title, pageNumber = 1) => {
      const url = `https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${title}&page=${pageNumber}`
      axios.get(url)
          .then(res => {
              let seasonArray = Array.from({length: res.data.total_pages}, (v, i) => i+1);
              this.setState({
                results: res.data.results,
                hasFetchedTitle: true,
                totalPages: seasonArray,
                currentPage: pageNumber
              })
          });
  }

  sortDate = (a, b) => {
      let dateA = a.release_date;
      let dateB = b.release_date;

      let comparison = 0;

      if (dateA > dateB) {
          comparison = -1;
      } else if (dateA < dateB) {
          comparison = 1;
      }

      return comparison;
  }

  render() {
    const {title, results, hasFetchedTitle, totalPages, currentPage} = this.state;
    return (
      <div className="App">
        <Search 
          updateResults={this.updateResults}
          searchMovieDb={this.searchMovieDb}
        />

        {!hasFetchedTitle && <NewReleases/>}

        {hasFetchedTitle && <MovieInfo 
          results={results}
          title={title}
          searchMovieDb={this.searchMovieDb}
          searchForShows={this.searchForShows}
          totalPages={totalPages}
          currentPage={currentPage}
        />}
      </div>
    );
  }
}

export default App;
