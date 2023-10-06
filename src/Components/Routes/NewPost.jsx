import { useState } from "react"
import { format } from "date-fns"
import api from '../../api/posts'

const NewPost = ({posts, setPosts, navigate}) => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const id = posts.length ? posts[posts.length-1].id + 1 : 1
    const datetime = format(new Date(), "MMMM dd, yyyy pp")
    
    const newPost = {id, title:postTitle, datetime, body:postBody}
    
    try{
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
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
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text" 
          id="postTitle"
          required
          autoFocus
          placeholder="Enter Post Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
          id="postBody"
          required
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost