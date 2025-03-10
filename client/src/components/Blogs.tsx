import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"
import axios from "axios";
import { backend } from "../utils/backend";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
    const [allBlogs, setAllBlogs] = useState<[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                await axios.get(backend + "/api/user/verify");
            } catch (e) {
                localStorage.clear();
                navigate("/signin");
            }
        }
        verify();
        const fetchData =  async () => {
            const response : { data : { success : boolean , blogs : [] } } = await axios.get(backend + "/api/blog");
            if(!response.data.success) {
                return ;
            }
            setAllBlogs(response.data.blogs);
        }
        fetchData();
    },[]);

    return (
        <div className="relative py-4 px-10 mt-16 h-full w-full flex flex-col gap-10">
            {
                allBlogs.length == 0 
                ?
                <div className="relative text-4xl flex justify-center items-center">
                    NOT FOUND
                </div>
                :
                allBlogs.map((blog, ind) => (
                    <BlogCard key={ind} ind={ind} blog={blog} />
                ))
            }
        </div>
    )
}

export default Blogs