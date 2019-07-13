import React, { Component } from 'react'
import PostList from '../post/PostList';

class Index extends Component {
    constructor(){
        super()
        
        this.state = {
            posts: "",
            user: "",
            token:""
        }
    }
    componentDidMount(){
        if(typeof window !== 'undefined'){
            const token = JSON.parse(localStorage.getItem("jwt"))
            this.setState({token: token})
        }
        this.getPosts();
    }

    getPosts = () => {
        return fetch("https://wykop-app.herokuapp.com/posts/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
            }
        }).then( response => {
            return response.json()
        }).then( data => {
            this.setState({posts:data})
        }).catch(err => console.log(err))
    }
    
    render() {
        const posts = this.state.posts
        return (
            <div>
               <PostList posts={posts} />
            </div>
        )
    }
} export default Index;
