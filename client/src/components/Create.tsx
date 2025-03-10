import { useEffect } from "react";
import { CreateForm } from "./CreateForm"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Create = () => {
    useEffect(() => {
        
    }, []);
    return (
        <div className="relative h-full w-full p-2 pt-4 sm:p-10 flex sm:grid grid-cols-2">
            <div className="col-span-1 h-full">
                <CreateForm/>
            </div>
            <div className="col-span-1 max-sm:hidden h-full ">
                <DotLottieReact
                    src="https://lottie.host/8dc516dc-66af-4c1f-8d82-a8935a9f806d/PoGOL5TP7d.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    )
}

export default Create