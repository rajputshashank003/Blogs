import { useState } from "react"
import Button from "./Button"

const Landing = () => {
    const [isAdmin] = useState<boolean | undefined>(localStorage.getItem("isAdmin") === 'true');

    return (
        <section className="relative h-full w-full">
            <div className="h-full flex mt-20 justify-center items-center flex-col w-full">
                <div className="relative max-sm:text-center font-bold max-sm:text-[2.5rem] sm:text-[5rem]">
                    Expand Your
                    <span> Mind</span>,
                    <br /> 
                    One Read at a 
                    <span> Time</span>
                </div>
                <div className="relative sm:mx-24 my-2 text-center text-zinc-600 text-[1.5rem]">
                    Explore curated articles, deep insights, and inspiring stories—all in one place. 
                    Whether for knowledge or entertainment, enjoy effortless reading that matters to you.
                </div>
            </div>
            <div className={`
                    buttons w-full flex justify-center items-center mt-10
                    gap-10
                `}
            >
                <Button bg='#9DD9D2' link="/blog" >
                    Read Blogs
                </Button>
                {
                    isAdmin &&
                    <Button bg='#FBECCA' link="/create" >
                        Create Blog
                    </Button>
                }
            </div>
        </section>
    )
}

export default Landing