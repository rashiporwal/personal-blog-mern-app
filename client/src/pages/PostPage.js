import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from 'react-markdown'
import apiService from "../services/apiService";
import '../markdown-styles.css';
import CategoryTag from "../components/CategoryTag";

const PostPage = () =>{
    const { slug } = useParams();

    const [post,setPost] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const fetchPost = async ()=>{
            try{
                setLoading(true);
                const response = await apiService.get(`/posts/slug/${slug}`);
                setPost(response.data);
            }catch(err){
                console.error("Failed to fetch post:",err);
                setError('Post not found or an error occured.')
            }finally{
                setLoading(false);
            }
        };

        fetchPost();
    },[slug]);

    const createMetaDescription = (markdown) => {
        if (!markdown) return '';

        const plainText = markdown
           .replace(/!\[.*?\]\(.*?\)/g, '') //Remove images
           .replace(/!\[.*?\]\(/g, '$1') //keep link text
           .replace(/[`*#_~]/g ,'') //remove markdown charqacters
           .replace(/\s+/g , '');

        return plainText.substring(0,155).trim() + '...';
    };

    if (loading){
        return <div>Loading post....</div>;
    }

    if (error){
        return <div>{error}</div>;
    }

    if (!post){
        return <div>Post not found.</div>
    }

    const categoriesContainerStyle = {
        marginTop: '1rem',
        marginBottom: '1rem',
        borderBottom: '1px solid #eee',
        paddingBottom : '1rem'
    };

    return (
        <article className="post-page">

            <Helmet>
                <title>{`${post.title} `}</title>
                <meta 
                 name="description"
                 content={createMetaDescription(post.markdownContent)}
                />
            </Helmet>

            <h1>{post.title}</h1>
            <p className="post-meta">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>

            {post.categories && post.categories.length > 0 && (
                <div style={categoriesContainerStyle}>
                    {post.categories.map(category => (
                        <CategoryTag key={category} category={category} />
                    ))}
                </div>
            )}

            <div className="post-content">
                <ReactMarkdown>
                    {post.markdownContent}
                </ReactMarkdown>
            </div>
        </article>
    );
};

export default PostPage;