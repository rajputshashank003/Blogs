import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({children, link, bg} : {children : ReactNode, link? : string, bg? : string}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(!link) {
            return ;
        }
        navigate(link)
    }
    return (
        <button 
            onClick={handleClick}
            style={{backgroundColor : bg || "#FBECCA"}}
            className={`
                relative p-4 text-[1.3rem] rounded-md font-semibold
                duration-300 cursor-pointer
                shadow-black shadow-[5px_5px_0px_0px_rgba(109,40,217)]
                hover:shadow-sm
            `}
        >
            {children}
        </button>
    )
}

export default Button