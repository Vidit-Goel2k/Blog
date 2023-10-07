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

import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const navigate = useNavigate() 
  const {width} = useWindowSize()

  // fetch posts from json-server at load time
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')
  useEffect(()=>{
    setPosts(data)
  },[data])

  // filter posts based on search 
  useEffect(() => {
    const filteredPosts = search ? (  
      posts.filter((post) =>(
        ((post.title.toLowerCase()).includes(search.toLocaleLowerCase())) 
        || ((post.body.toLowerCase()).includes(search.toLocaleLowerCase()))
      )) 
    ) : (
      posts
    )
    // ******* Very Very important {I don't know why I had to do this but because of this my posts state got a reversed array}
    // OLD WITH UNEXPECTED APPLICATION BEHAVIOUR: 
    setSearchResult(filteredPosts.reverse())
    // NEW WITHOUT ERROR AND BEHAVIOUR AS EXPECTED
    // const orderedFilterPosts = [...filteredPosts].reverse()
    // setSearchResult(orderedFilterPosts)
  }, [posts, search])

  return (
    <>
      <Routes>
        <Route 
          path='/' 
          element={<Layout 
            title="Blog"
            search={search}
            setSearch={setSearch}
            width={width}
            />} 
            >
          <Route 
            index 
            element={<Home 
              posts={searchResult}
              fetchError={fetchError}
              isLoading={isLoading}
            />}
          />
          <Route path='post'>
            <Route 
              index 
              element={<NewPost
                posts={posts} 
                navigate={navigate}
                setPosts={setPosts} 
              />} 
            />
            <Route 
              path=':id' 
              element={<PostPage
                posts={posts}
                setPosts={setPosts}
                navigate={navigate}
              />} 
            />
          </Route> 
          <Route 
            path='edit/:id' 
            element={<EditPost 
              posts={posts} 
              setPosts={setPosts} 
              navigate={navigate} 
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
