import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className="Missing"> 
      <h2>Post Not Found</h2>
      <p className="postDate" > {`Well, that's disappointing.`} </p>
      <p className="postBody" > <Link to="/">Visit our HomePage</Link> </p>
    </main>
  )
}

export default Missing