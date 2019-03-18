import React, {Component} from 'react';
import {key} from '../config/keys';
import axios from 'axios';
import moment from 'moment';

class MovieInfo extends Component {

    state = {
        results : [],
        hasFetchedTitle: false
    }

    searchMovieDb = (title) => {
        let formattedTitle = [];
        title.split('').forEach(letter => {
            if (letter !== ' ') {
                formattedTitle.push(letter);
            } else {
                formattedTitle.push('+');
            }
        });
        title = formattedTitle.join('');
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${title}`;
        axios.get(url)
            .then(res =>  this.setState({results: res.data.results, hasFetchedTitle: true}))
            .catch(err => console.log(err));

        console.log(this.state.results)

    }

    render() {
        const {movie, title} = this.props;
        const {hasFetchedTitle, results} = this.state;

        return (
            <div>
                {!hasFetchedTitle && title ? this.searchMovieDb(title) :

                    <div>
                        {!title && <div style={{color:'white'}}>
                            <h1>{movie.title}</h1>
                            <p>released: {moment(movie.release_date).format('MMMM DD, YYYY')}</p>
                            <p>{movie.overview}</p>
                        </div>}

                        
                        {title && results.map(details => (
                            <div key ={details.id} style={{color: 'white'}}>
                                <p>{details.title}</p>
                            </div>
                        ))}
                    
                    
                    </div>
                }
            </div>
        )
    }
}

export default MovieInfo;