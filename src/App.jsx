import { useState, useEffect } from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom'; Switch and useHistory depreciated from router v6
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './Components/Layout';

import Home from './Components/Routes/Home';
import NewPost from './Components/Routes/NewPost';
import PostPage from './Components/Routes/PostPage';
import About from './Components/Routes/About';
import Missing from './Components/Routes/Missing';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [search, setSearch] = useState("")

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
              posts={posts}
            />}
          />
          <Route path='post'>
            <Route index element={ <NewPost />} />
            <Route path=':id' element={ <PostPage />} />
          </Route> 
          <Route path='about' element={ <About />} />
          <Route path='*' element={ <Missing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
