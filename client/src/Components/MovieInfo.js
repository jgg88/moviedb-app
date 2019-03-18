import React, {Component} from 'react';
import moment from 'moment';

class MovieInfo extends Component {

    searchMovieDb = (results) => {
        console.log(results)
    }

    render() {
        const {movie, results} = this.props
        return (
            <div>
                {results ? this.searchMovieDb(results) :
                    <div style={{color:'white'}}>
                        <h1>{movie.title}</h1>
                        <p>released: {moment(movie.release_date).format('MMMM DD, YYYY')}</p>
                        <p>{movie.overview}</p>
                    </div>
                }
            </div>
        )
    }
}

export default MovieInfo;