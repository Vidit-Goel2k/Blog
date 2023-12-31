import { useParams, Link } from "react-router-dom"
import api from '../../api/posts'
import { useContext } from "react"
import DataContext from "../../context/DataContext"

const PostPage = () => {

  const {posts, setPosts, navigate} = useContext(DataContext)
  
  const {id} = useParams()
  const post = posts.find((post) => (post.id).toString() === id)

  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`)
      const updatedPostsList = posts.filter((post)=>(post.id !== id))
      setPosts(updatedPostsList)
      navigate("/")
    }
    catch(err){
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }
      else{
        console.log(`Error: ${err.message}`)
      }
    }
    
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post 
          ?(
              <>
                <h2>{post.title}</h2>
                <p className="postDate" > {post.datetime} </p>
                <p className="postBody" > {post.body} </p>
                <Link to={`/edit/${post.id}`}> 
                 <button className="editButton" >
                    Edit Post
                 </button>
                </Link>
                <button className="deleteButton" onClick={()=>handleDelete(post.id)}>
                  Delete Post
                </button>
              </>
            ) 
            :(
              <>
                <h2>Post Not Found</h2>
                <p className="postDate" > {`Well, that's disappointing.`} </p>
                <p className="postBody" > <Link to="/">Visit our HomePage</Link> </p>
              </>
            )}
      </article>
    </main>
  )
}

export default PostPage