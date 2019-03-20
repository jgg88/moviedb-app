import React, {Component} from 'react';
import moment from 'moment';

class MovieInfo extends Component {

    render() {
        const {movie, results, title} = this.props;
        return (
            <div>
                {!results && <div style={{color:'white'}}>
                    <h1>{movie.title}</h1>
                    <p>released: {moment(movie.release_date).format('MMMM DD, YYYY')}</p>
                    <p>{movie.overview}</p>
                </div>}
                
                {results && <div className='results-container'>
                    <h1>Results</h1>
                    <div className='tab-container'>
                        <div className='results-tab' onClick={() => this.props.searchMovieDb(title)}>Movies</div>
                        <div className='results-tab' onClick={() => this.props.searchForShows(title)}>Series</div>
                    </div>
                    
                    {results.map(details => (
                        <div key ={details.id} style={{color: 'white'}} className='results'>
                            <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} className='results-img'/>
                            <p>{details.title || details.name}</p>
                            {details.first_air_date ? 
                                <h2>TV Show</h2> :
                                <h2>Movie</h2>
                            }
                        </div>
                    ))}
                </div>}
            </div>
        )
    }
}

export default MovieInfo;