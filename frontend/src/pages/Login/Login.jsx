import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from './Login.module.css';
import Logo from '../../components/Logo/Logo';
import BackgroundSVG from "../../components/BackgroundSvg/BackgroundSvg";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            dispatch(login(data.user));
            console.log("User logged in:", data);
            navigate("/diary");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.login}> {/* ✅ Aplică stilul */}
         <div className={styles.home}><BackgroundSVG /> </div>
         <div className={styles.loginContainer}>
            <header className={styles.header}>
        <div className={styles.logoContainer}>
                    <Logo />
                </div>
                <div className={styles.verticalBar}></div>
                <nav className={styles.nav}>
                    <Link to="/login" className={styles.navLink}>Log in</Link>
                    <Link to="/register" className={styles.navLink}>Registration</Link>
                </nav></header>
                <div className={styles.headerBar}></div>
            <h2 className={styles.titleLogin}>Log in</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.loginButton}>Login</button>
                <button type="button" className={styles.registerButton} onClick={() => navigate("/register")}>
                Register
            </button></div>
            </form></div>
        </div>
    );
};

export default LoginPage;