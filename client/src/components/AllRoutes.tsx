import Landing from './Landing'
import Create from './Create'
import { Routes , Route } from "react-router-dom";
import Blog from './Blog';
import Blogs from './Blogs';
import GoogleSignIn from '../Pages/GoogleSignIn';

const AllRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/blog" element={<Blogs/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/blog/:id" element={<Blog/>} />
          <Route path="/signin" element={<GoogleSignIn/>} />
      </Routes>
  )
}

export default AllRoutes