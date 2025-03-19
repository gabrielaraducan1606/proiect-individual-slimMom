import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo";
import UserInfo from "../UserInfo/UserInfo";
import styles from './Header.module.css'

const Header = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    return (
        <header>
            <div className={styles.menu}>
                <div>
            <Logo /></div>
            <nav>
                {isAuthenticated ? <UserInfo /> : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav></div>
        </header>
    );
};

export default Header;
