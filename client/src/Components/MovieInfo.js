import React, {Component} from 'react';
import moment from 'moment';

class MovieInfo extends Component {

    state = {
        showingSeriesResults: false
    }

    render() {
        const {showingSeriesResults} = this.state;
        const {movie, results, title, totalPages} = this.props;
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
                        <div className={!showingSeriesResults ? 'results-tab-active' : 'results-tab'} onClick={() => {
                            this.props.searchMovieDb(title)
                            this.setState({showingSeriesResults: false})
                        }}>Movies</div>
                        <div className={showingSeriesResults ? 'results-tab-active' : 'results-tab'} onClick={() => {
                            this.props.searchForShows(title)
                            this.setState({showingSeriesResults: true})
                        }}>Series</div>
                    </div>
                                 
                    {results.map(details => (
                        <div key ={details.id} style={{color: 'white'}} className='results'>
                            {details.poster_path ?
                                <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} className='results-img'/> : <div className='results-img results-placeholder'/>
                            }
                            <div className='results-details'>
                                <h2>{details.title || details.name}</h2>
                                <h5>{moment(details.release_date).format('MMMM DD YYYY') || 
                                moment(details.first_air_date).format('MMMM DD YYYY')}</h5>
                                <p>{details.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        )
    }
}

export default MovieInfo;