import React, {Component} from 'react';
import {key} from '../config/keys';
import MovieInfo from './MovieInfo';
import axios from 'axios';

class NewReleases extends Component {

    state = {
        newMovies: [],
        displayMovieInfo: false,
        details: null
    }

    componentDidMount() {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`;
        axios.get(url)
            .then(res => {
                this.setState({
                    newMovies: res.data.results
                })
                console.log(this.state.newMovies)
        })
        .catch(err => console.log(err));
    }

    showMovieInfo = (movie) => {
        this.setState({
            details: movie,
            displayMovieInfo: true
        });
    }
    
    render() {
        const {newMovies, displayMovieInfo, details} = this.state;

        return (
            <div className='newReleases-main'>
                <h1>New Releases</h1>
                <div className='newMovies-container'>
                    {newMovies.map(movie => (
                        <div className='newMovie' key={movie.id} onClick={() => this.showMovieInfo(movie)}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='Movie poster'/>
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
                {displayMovieInfo && <MovieInfo movie={details}/>}
            </div>
        )
    }
}

export default NewReleases;