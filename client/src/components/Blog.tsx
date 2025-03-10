import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Title from "./Title";
import { backend } from "../utils/backend";
import axios from "axios";

interface blogType {
    id : string, 
    image : string, 
    title : string ,
    description : string
}

const Blog = () => {
    
    const { id } = useParams();
    const [blog , setBlog] = useState<blogType>();
    useEffect(() => {
        const fetchData =  async () => {
            const response : { data : { success : boolean , blog : blogType } } = await axios.get(backend + "/api/blog/" + id);
            if(!response.data.success) {
                return ;
            }
            setBlog(response.data.blog);
        }
        fetchData();
    }, []);

    if(!blog) {
        return (
            <div className="relative text-4xl flex justify-center items-center">
                NOT FOUND
            </div>
        )
    }
    return (
        <section className="h-full rounded-2xl mx-4 sm:mx-20 p-10 bg-[#9DD9D2] relative mt-16">
            <Title title={blog.title.toUpperCase()} />
            <div className="relative">
                <img src={blog.image} className="rounded-xl h-50 w-50 object-cover" alt="" />
            </div>
            <div className="relative flex  text-xl p-4">
                {blog.description}
            </div>
        </section>
    )
}

export default Blog