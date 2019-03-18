import React, {Component} from 'react';

class Search extends Component {
    state = {
        input: ''
    }
    render() {
        const {input} = this.state;
        return (
            <div>
                <input type='text' onChange={(e) => this.setState({input: e.target.value})}/>
                <input type='submit' onClick={(e) => this.props.updateTitle(input)}/>
            </div>
        )
    }
}

export default Search;