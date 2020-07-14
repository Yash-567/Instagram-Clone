import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({imageUrl, username, caption}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_Avatar"
                    alt='Yash'
                    src='/static/images/avatar/1.jpg'
                />
                <h3>{username}</h3>
            </div>
            <img 
            className="post_image"
            src={imageUrl}
            alt="Post"/>
            <h4 className="post_text"><strong>{username}:</strong> {caption}</h4>
        </div>
    )
}

export default Post
