import {DataProvider} from './context/DataContext'

// import { Route, Switch, useHistory } from 'react-router-dom'; Switch and useHistory depreciated from router v6
import { Route, Routes } from 'react-router-dom';

import Layout from './Components/Layout';
import Home from './Components/Routes/Home';
import NewPost from './Components/Routes/NewPost';
import PostPage from './Components/Routes/PostPage';
import About from './Components/Routes/About';
import Missing from './Components/Routes/Missing';
import EditPost from './Components/Routes/EditPost';

function App() {

  return (
    <DataProvider>
      <Routes>
        <Route path='/' element={<Layout title="Blog" />} >
          
          <Route index element={<Home />} />
          
          <Route path='post'>
            <Route index element={<NewPost />} />
            <Route path=':id' element={<PostPage />} />
          </Route> 
          
          <Route path='edit/:id' element={<EditPost /> } />
          
          <Route path='about' element={ <About />} />
          
          <Route path='*' element={ <Missing />} />

        </Route>
      </Routes>
    </DataProvider> 
  )
}

export default App
