import React, { Component } from 'react';
import './App.css';
import NewReleases from './Components/NewReleases';
import Search from './Components/Search';
import MovieInfo from './Components/MovieInfo';

class App extends Component {
  state = {
    title: ''
  }

  updateTitle = (results) => {
    this.setState({title: results });
    console.log(this.state.title)
  }

  render() {
    const {title} = this.state;
    return (
      <div className="App">
        <Search updateTitle={this.updateTitle}/>
        {title === '' && <NewReleases/>}
        {title !== '' && <MovieInfo title={title}/>}
      </div>
    );
  }
}

export default App;
