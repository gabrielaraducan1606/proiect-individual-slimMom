import React from "react";
import { useSelector } from "react-redux";
import styles from "./Loader.module.css";

const Loader = () => {
    const isLoading = useSelector((state) => state.loader?.isLoading || false);

    if (!isLoading) return null;

    return (
        <div className={styles.loaderOverlay}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default Loader;
