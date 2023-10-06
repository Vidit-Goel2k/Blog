import { useState, useEffect } from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom'; Switch and useHistory depreciated from router v6
import { Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import Layout from './Components/Layout';
import Home from './Components/Routes/Home';
import NewPost from './Components/Routes/NewPost';
import PostPage from './Components/Routes/PostPage';
import About from './Components/Routes/About';
import Missing from './Components/Routes/Missing';

import api from './api/posts'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const navigate = useNavigate() 

  const [editTitle, setEditTitle] = useState("")
  const [editBody, setEditBody] = useState("")
  
  // fetch posts from json-server at load time
  useEffect(() => {
    const fetchPosts = async() => {
      try{
        const response = await api.get('/posts')
        setPosts(response.data.reverse())
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

    fetchPosts()
  }, [])

  // filter posts based on search 
  useEffect(() => {
    const filteredPosts = search ? posts.filter((post) =>(
      ((post.title.toLowerCase()).includes(search.toLocaleLowerCase())) 
      || ((post.body.toLowerCase()).includes(search.toLocaleLowerCase()))
    )) : posts

    setSearchResult(filteredPosts)
  }, [search, posts])
  
  const handleEdit = async (id) => {

    const datetime = format(new Date(), "MMMM dd, yyyy pp")
    const updatedPost = {id, title:editTitle, datetime, body:editBody}

    try{
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map((post)=> post.id === id ? {...response.data} : post))
      setEditTitle("")
      setEditBody("")
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
    <>
      <Routes>
        <Route 
          path='/' 
          element={<Layout 
            title="Blog"
            search={search}
            setSearch={setSearch}
          />} 
        >
          <Route 
            index 
            element={<Home 
              posts={searchResult}
            />}
          />
          <Route path='post'>
            <Route index element={<NewPost 
              posts={posts} 
              navigate={navigate}
              setPosts={setPosts} 
            />} />
            <Route 
              path=':id' 
              element={<PostPage
                posts={posts}
                setPosts={setPosts}
                navigate={navigate}
              />} 
            />
          </Route> 
          <Route path='about' element={ <About />} />
          <Route path='*' element={ <Missing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
