import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const ErrorPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/error')
    },[])
    return (
        <h1>
            OOOPSSS! Something went wrong!
        </h1>
    );
};

export default ErrorPage;