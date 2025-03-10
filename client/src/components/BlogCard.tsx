import { useNavigate } from "react-router-dom";
import Title from "./Title";

const BlogCard = ({ blog, ind } : {ind : number , blog : {id : string , title : string, description : string , image : string}}) => {
    const navigate = useNavigate();
    return (
        <section 
            className={`
                relative
                h-full w-full bg-[#9DD9D2] rounded-xl p-10
                shadow-black shadow-[5px_5px_0px_0px_rgba(109,40,217)]
                hover:shadow-sm duration-200
            `}
        >
            <Title ind={ind + 1} title={blog.title} />
            <div 
                onClick={() => navigate("/blog/" + blog.id)}
                className="readmore absolute group cursor-pointer bottom-0 sm:right-10 sm:top-1/2 -translate-y-1/2">
                Read More
                <div 
                    className="group-hover:w-full duration-300 w-0 z-[999] h-[2.8px] bg-slate-800"
                />
            </div>
        </section>
    )
}

export default BlogCard