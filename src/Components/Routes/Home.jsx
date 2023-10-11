import { useContext } from "react"
import Feed from "./Feed"
import DataContext from "../../context/DataContext"

const Home = () => {
  const {searchResult, fetchError, isLoading} = useContext(DataContext)
  const posts=searchResult
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{color:"red"}} >There was some Error, Please reload the page, or try again later.</p>}
      { !isLoading && !fetchError && (posts.length ? 
        (
          <Feed posts={posts} />
        ) 
        : (
          <p className="statusMsg">
            No posts to display.
          </p>
        ))
      }
    </main>
  )
}

export default Home