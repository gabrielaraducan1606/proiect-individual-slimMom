import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"; 
import styles from "./Logo.module.css"; 

const Logo = () => {
    return (
        <Link to="/" className={styles.logoContainer}> 
            <img src={logo} alt="Health App Logo" className={styles.logo} />
        </Link>
    );
};

export default Logo;
