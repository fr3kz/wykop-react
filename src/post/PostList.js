import React, { Component } from 'react'
import PostDetail from './PostDetail';

export default class PostList extends Component {
    render() {
        const posts = Array.from(this.props.posts)
        return (
            <div>
                {posts.map((post, id) => 
                    <PostDetail key={id} post={post} />
                )}
            </div>
        )
    }
}
