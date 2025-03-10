import { useNavigate } from "react-router-dom"

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='relative px-10 pt-10 h-fit w-full '>
            &copy; {new Date().getFullYear()}
            <div onClick={() => navigate("/")} className="left-0 cursor-pointer hover:text-zinc-700 duration-200 relative font-bold text-[2rem]">
                Your Blog
            </div>
        </div>
    )
}

export default Footer