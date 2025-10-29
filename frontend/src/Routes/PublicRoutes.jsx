import { Navigate } from "react-router-dom";
import Home from "../components/Home";

const PublicRoute = ({children})=>{
    const token = localStorage.getItem("jwtToken");
    if(token){
        return <Navigate to="/Home" />;
    }
    return children;
}

export default PublicRoute;