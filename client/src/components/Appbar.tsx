import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { useState } from "react";

const Appbar = () => {
    const navigate = useNavigate();
    const [loggedIn] = useState(localStorage.getItem("token"));
    const handleClick = () => {
        localStorage.clear();
        navigate("/signin");
    }
    return (
        <div className='relative px-10 pt-4 h-fit w-full '>
            <div onClick={() => navigate("/")} className="left-0 cursor-pointer hover:text-zinc-700 duration-200 relative font-bold text-[3rem]">
                YB
            </div>
            <div className="absolute right-10 bottom-2">
                {
                    !loggedIn ? 
                    <Button link="/signin">
                        Signup
                    </Button>
                    :
                    <div onClick={handleClick}>
                        <Button >
                            Signout
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Appbar