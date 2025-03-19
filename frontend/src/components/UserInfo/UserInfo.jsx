import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const UserInfo = () => {
    const { isAuthenticated, userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    if (!isAuthenticated) return null;

    return (
        <div className="flex items-center gap-4">
            <span className="text-white">{userInfo?.name}</span>
            <button 
                onClick={() => dispatch(logout())} 
                className="bg-red-500 px-3 py-1 rounded text-white"
            >
                Logout
            </button>
        </div>
    );
};

export default UserInfo;