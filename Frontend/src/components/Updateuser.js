import React, { Component } from 'react';

class Updateuser extends Component {
    constructor()
    {
        super()
        this.state={id:''};
    }
    
    componentDidMount()
    {
        this.setState({id:this.props.match.params.id});
        console.log(this.props.match.params.id);
    }
    render() {
        return (
            <div>
                <h1>the user id for updation is {this.state.id}</h1>
            </div>
        );
    }
}

export default Updateuser;