import React, {Component} from 'react';
import moment from 'moment';

class MovieInfo extends Component {

    state = {
        showingSeriesResults: false,
    }

    render() {
        const {showingSeriesResults} = this.state;
        const {movie, results, title, totalPages, currentPage} = this.props;

        return (
            <div>
                {!results && 
                <div key ={movie.id} style={{color: 'white'}} className='movie-info-container'>
                    {movie.poster_path ?
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='results-img' alt='movie poster'/> : <div className='results-img results-placeholder'/>
                    }
                    <div className='results-details'>
                        <h2>{movie.title || movie.name}</h2>
                        <p>{moment(movie.release_date).format('MMMM DD YYYY') || 
                        moment(movie.first_air_date).format('MMMM DD YYYY')}</p>
                        <p>{movie.overview}</p>
                    </div>
                </div>}
                
                {results && 
                <div className='results-container'>
                    <div className='tab-container'>
                        <div className={!showingSeriesResults ? 'results-tab-active' : 'results-tab'} onClick={() => {
                            this.props.searchMovieDb(title)
                            this.setState({showingSeriesResults: false})
                        }}>Movies</div>
                        <div className={showingSeriesResults ? 'results-tab-active' : 'results-tab'} onClick={() => {
                            this.props.searchForShows(title)
                            this.setState({showingSeriesResults: true})
                        }}>Series</div>
                        <h1>Results</h1>
                    </div>

                    <div className='pagination-container'>
                        {totalPages.map(page => 
                            <button 
                                key={page} 
                                onClick={() => {
                                    !showingSeriesResults 
                                    ? this.props.searchMovieDb(title, page) : 
                                    this.props.searchForShows(title, page)
                                }}
                                className={currentPage === page ? 'page-button-active' : 'page-button'}
                            >{page}</button>
                        )}
                    </div>
                    {results.map(details => (
                        <div key ={details.id} style={{color: 'white'}} className='results'>
                            {details.poster_path ?
                                <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} className='results-img' alt='movie poster'/> : <div className='results-img results-placeholder'/>
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