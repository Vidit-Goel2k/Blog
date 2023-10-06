import { useState, useEffect } from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom'; Switch and useHistory depreciated from router v6
import { Route, Routes, useNavigate } from 'react-router-dom';

import Layout from './Components/Layout';
import Home from './Components/Routes/Home';
import NewPost from './Components/Routes/NewPost';
import PostPage from './Components/Routes/PostPage';
import About from './Components/Routes/About';
import Missing from './Components/Routes/Missing';
import EditPost from './Components/Routes/EditPost';

import api from './api/posts'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState("")
  // const [isPostEdited, setIsPostEdited] = useState(false)
  const navigate = useNavigate() 

  // fetch posts from json-server at load time
  useEffect(() => {
    const fetchPosts = async() => {
      try{
        const response = await api.get('/posts')
        setPosts(response.data)
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
  }, [setSearchResult])

  // filter posts based on search 
  useEffect(() => {
    const filteredPosts = search ? posts.filter((post) =>(
      ((post.title.toLowerCase()).includes(search.toLocaleLowerCase())) 
      || ((post.body.toLowerCase()).includes(search.toLocaleLowerCase()))
    )) : posts

    setSearchResult(filteredPosts.reverse())
  }, [search, posts])

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
            <Route 
              index 
              element={<NewPost
                posts={posts} 
                navigate={navigate}
                setPosts={setPosts} 
                // setIsPostEdited={setIsPostEdited}
              />} 
            />
            <Route 
              path=':id' 
              element={<PostPage
                posts={posts}
                setPosts={setPosts}
                navigate={navigate}
                // setIsPostEdited={setIsPostEdited}
              />} 
            />
          </Route> 
          <Route 
            path='edit/:id' 
            element={<EditPost 
              posts={posts} 
              setPosts={setPosts} 
              navigate={navigate} 
              // setIsPostEdited={setIsPostEdited} 
            /> } 
          />
          <Route path='about' element={ <About />} />
          <Route path='*' element={ <Missing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
