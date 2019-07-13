import React, { Component } from 'react'

export default class PostDetail extends Component {
    render() {

        const {title,header,published,likes,dislikes,body} = this.props.post
        console.log(this.props.post)
        return (
            <div>
                <p>{title}</p>
                <p>{body}</p>
                <p>{header}</p>
                <p>{published}</p>
                <p> {likes} </p>
                <p> {dislikes} </p>
                <hr></hr>
            </div>
        )
    }
}
