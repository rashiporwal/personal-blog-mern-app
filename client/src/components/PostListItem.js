
import React from "react";

import { Link } from "react-router-dom";

import CategoryTag from "./CategoryTag";

const categoriesContainerStyle = {
    marginTop : '10px',
}

const PostListItem = ({post}) => {
    // const snippet = post.markdownContent ? post.markdownContent.replace(/[#*`]/g, "").substring(0,150) + '...': '';

    return(
        <div className="post-list-item">
            <h2>
                <Link to={`/post/${post.slug}`}>
                  {post.title}
                </Link>
            </h2>
            <p className="post-meta">
                By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
            </p>

            {post.categories && post.categories.length > 0 && (
                <div style={categoriesContainerStyle}>
                    {post.categories.map(category => (
                        <CategoryTag key={category} category={category} />
                    ))}
                    </div>
            )}
        </div>
        
       
    )
};

export default PostListItem;