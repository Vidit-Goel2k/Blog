import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../../api/posts'
import { format } from 'date-fns';
import DataContext from "../../context/DataContext";

const EditPost = () => {

    const {posts, setPosts, navigate} = useContext(DataContext)

    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    const {id} = useParams()
    const post = posts.find((post) => (post.id).toString() === id)

    useEffect(()=>{
        setEditTitle(post.title)
        setEditBody(post.body)

    }, [post])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = { id, title: editTitle, datetime, body: editBody };

        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(
                posts.map((post) => (post.id === id ? { ...response.data } : post))
            );
            setEditTitle("");
            setEditBody("");
            navigate("/");
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error: ${err.message}`);
            }
        }
    };

    return(
        <main className="NewPost">
            {post.id ? (
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={e=>e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input 
                            type="text" 
                            id="postTitle"
                            required
                            autoFocus
                            placeholder="Enter Post Title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea 
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e)=> setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            ):(
                <>
                    <h2>Post Not Found</h2>
                    <p className="postDate" > {`Well, that's disappointing.`} </p>
                    <p className="postBody" > <Link to="/">Visit our HomePage</Link> </p>
                </>
            )}
        </main>
    )
};

export default EditPost;
