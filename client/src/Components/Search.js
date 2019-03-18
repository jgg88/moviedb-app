import React, {Component} from 'react';

class Search extends Component {
    render() {
        return (
            <input type='text' onChange={(e) => this.props.updateSearchResults(e.target.value)}/>
        )
    }
}

export default Search;