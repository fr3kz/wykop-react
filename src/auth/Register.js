import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class Register extends Component {
    constructor(){
        super();

        this.state = {
            username:"",
            password:"",
            message: "",
            loading: false,
            redirectToReferer: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name] : event.target.value})
    }
    
    authenticate (jwt) {
        if(typeof window !== "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt));
        }
    }

    clickSubmit = event => {
        event.preventDefault();
        
        const user = {
            username:this.state.username,
            password:this.state.password
        }

        this.signup(user).then( data => {
            const token = data.access;
            this.authenticate(token);
            this.setState({redirectToReferer:true})
        });
    }

    signup = user => {
        return fetch('https://wykop-app.herokuapp.com/accounts/signup/', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then( response => {
            return response.json()
        }).catch(err => console.log(err))
    }


    render() {
        if(this.state.redirectToReferer){
            return <Redirect to="/" />
         }

        return (
            <div className="container">
            <h2 className="mt-5 mb-5">signup3</h2>

            <div className="alert alert-danger" style={{ display: this.state.message ? "" : "none" }} >
                {this.state.message}
            </div>   

            {this.state.loading ? <div className="jumbotron text-center"><h2>Loading</h2></div> : ""}     

            <form>
                <div className="form-group">
                    <lablel className="text-muted">username</lablel>
                    <input onChange={this.handleChange("username")} type="text" className="form-control"  value={this.state.username} />
                </div>

                <div className="form-group">
                    <lablel className="text-muted">Password</lablel>
                    <input onChange={this.handleChange("password")} type="password" className="form-control"  value={this.state.password} />
                </div>

                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}
