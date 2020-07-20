import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    render() {
        return (
            <>
            <div className="container">
                <h1>Welcome {this.props.match.params.name}. <Link to="/todos">My todo list.</Link></h1>
            </div>
            </>
            
        )
    }
}
export default WelcomeComponent;