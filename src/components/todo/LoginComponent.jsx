import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {

    constructor(props){
        super(props)
        this.state= {
            username: "",
            password: "",
            loginFailed: false,
            validCredentials: false
        }
        this.handleChange=this.handleChange.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
    }
    render() {
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.validCredentials && <div>Login sucessfull</div>}
                    {this.state.loginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className="btn btn-success" onClick={this.validateCredentials}>Login</button>
                </div>
            </div>
        )
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value })
    }

    validateCredentials(){
        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
        .then( (resp) => {
            AuthenticationService.registerSuccessfulToken(this.state.username, resp.data.token);
            this.props.history.push(`/welcome/${this.state.username}`);
        })
        .catch( () => {
            this.setState({loginFailed: true});
            this.setState({validCredentials: false});
        });
    }
}

export default LoginComponent;