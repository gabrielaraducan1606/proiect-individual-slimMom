import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const token = localStorage.getItem("token");

    return isAuthenticated && token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
