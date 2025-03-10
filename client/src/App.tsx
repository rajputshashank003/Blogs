import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import "./axiosConfig.js";
import "./utils/Interceptors/AuthInterceptor.js";

const App = () => {
    return (
        <BrowserRouter >
            <div 
                style={{fontFamily : "Font1"}}
                className="min-h-screen w-full sm:p-10 p-2 bg-[#FFF8F0]"
            >
                <Appbar/>
                <div className="min-h-screen">
                    <AllRoutes/>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}
export default App;