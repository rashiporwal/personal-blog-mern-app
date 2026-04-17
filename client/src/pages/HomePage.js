import React , {useState , useEffect} from "react";
import { Helmet } from "react-helmet-async";
import PostListItem from "../components/PostListItem";
import apiService from "../services/apiService";
import './HomePage.css';

const HomePage = () =>{

    const [posts,setPosts] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(null);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            setLoading(true);
            setError(null);
            try{
                const response = await apiService.get(`/posts?page=${currentPage}&limit=4`);

                const {posts:fetchPosts , totalPages:fetchedtotalPages} = response.data;

                setPosts(fetchPosts);
                setTotalPages(fetchedtotalPages)
            }catch(err){
                console.error('Error fetching posts:',err);
                setError('Failed to fetch posts.Please try again later.')
            }finally{
                setLoading(false);
            }
        };
        fetchPosts();
    },[currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages){
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1){
            setCurrentPage(prevPage => prevPage -1);
        }
    };

    if (loading){
        return <div>Loading posts....</div>
    }

    if (error){
        return <div style={{color:'red'}}>{error}</div>
    }

    return (
      <div className="home-page">
        <Helmet>
            <title>My Awesome Blog - Latest Posts</title>
            <meta 
            name="description"
            content="Welcome to My Awesome Blog.Read the latest articles on tech,and no-tech subjects or stuffs."
            />
        </Helmet>
        <h1 className="heading-main">🌸🪷PERSONAL_BLOG_POST🪷🌸</h1>
        <div className="post-list">
          {posts.length > 0 ? (
            posts.map(post => <PostListItem key={post._id} post={post}/>)
          ):(
            <p>No posts to display</p>
          )}
        </div>

        {totalPages > 0 && (
           <div className="pagination-controls">
            <div className="page-info">
                Page {currentPage} of {totalPages}
            </div>
            <div className="pagination-buttons">
                <button className="btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn">
                    Next
                </button>
            </div>
           </div>


        )}
        
      </div>
    );
};

export default HomePage;

