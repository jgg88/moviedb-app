import React, {Component} from 'react';

class Search extends Component {
    state = {
        input: ''
    }
    render() {
        const {input} = this.state;
        return (
            <div className='header'>
                <h1>Joshua's Movie Database</h1>
                <div className='search-container'>
                    <input type='text' className='search-input' onChange={(e) => {
                        this.setState({input: e.target.value})
                        this.props.updateResults(e.target.value)
                    }}/>
                    <button className='search-button' onClick={(e) => this.props.searchMovieDb(input)}>search</button>
                </div>
            </div>
        )
    }
}

export default Search;