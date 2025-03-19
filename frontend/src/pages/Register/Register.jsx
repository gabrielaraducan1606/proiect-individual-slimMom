import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './Register.module.css';
import Logo from '../../components/Logo/Logo';
import BackgroundSVG from "../../components/BackgroundSvg/BackgroundSvg";

const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Registration Page Loaded");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }
            
            console.log("User registered:", data);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.register}>
             <div className={styles.home}><BackgroundSVG /> </div>
            <div className={styles.registerContainer}>
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
            <h2 className={styles.titleRegister}>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <input type="text" placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className={styles.buttonContainer}>
                <button type="submit" className={styles.registerButton}>Register</button>
                <button type="button" className={styles.loginButton} onClick={() => navigate("/login")}>
                Login
            </button></div>
            </form></div>
        </div>
    );
};

export default RegistrationPage;