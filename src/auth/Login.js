import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(){
        super()

        this.state = {
            username: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
        
    }

    handleChange = name => event => {
        this.setState({error:""});
        this.setState({ [name]: event.target.value });
    }

    authenticate (jwt,next) {
        if(typeof window !== "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    }

    clickSubmit = event =>{
        event.preventDefault();

        this.setState({loading:true});

        const {username,password} = this.state
        const user = {
            username:username,
            password:password,
        }

       this.signin(user).then(data => {

           if(data.message){
                this.setState({error: data.message, loading:false})
            }
            else {
                this.authenticate(data.access, () =>{
                    this.setState({redirectToReferer: true})
                });

                this.setState({
                    username:"",
                    password:"",
                    error:"",
                })
            }

       });
    }

    signin = user =>{
        return fetch("https://wykop-app.herokuapp.com/accounts/signin/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).catch(err => console.log(err));
    }

    render() {

        if(this.state.redirectToReferer){
            return <Redirect to="/" />
         }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">signin</h2>

                <div className="alert alert-danger" style={{ display: this.state.error ? "" : "none" }} >
                    {this.state.error}
                </div>   

                {this.state.loading ? <div className="jumbotron text-center"><h2>Loading</h2></div> : ""} 

                <div className="alert alert-info" style={{ display: this.state.open ? "" : "none" }} >
                New Account is successfully created. Please Sign In.
                </div>    

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
export default Login;