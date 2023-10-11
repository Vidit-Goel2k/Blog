import {createContext, useState, useEffect} from 'react'

import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({})

export const DataProvider = ({children}) => {

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState("")
    const navigate = useNavigate() 

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
        // setSearchResult(filteredPosts.reverse())
        // NEW WITHOUT ERROR AND BEHAVIOUR AS EXPECTED
        const orderedFilterPosts = [...filteredPosts].reverse()
        setSearchResult(orderedFilterPosts)
    }, [posts, search])

    return(
        <DataContext.Provider value={{
            posts, setPosts, search, setSearch, searchResult, setSearchResult, navigate, fetchError, isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext