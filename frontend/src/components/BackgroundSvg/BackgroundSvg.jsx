import React from "react";
import styles from "./BackgroundSvg.module.css";
import background from "../../assets/VectorHomePage.svg";
import banana from "../../assets/banana.svg";
import leaves from "../../assets/leaves.svg";
import strawberry from "../../assets/Strawberry.svg";

const BackgroundSVG = () => {
    return (
        <div className={styles.svgContainer}>
            <img src={background} alt="Background" className={styles.svgBackground} />
            <img src={banana} alt="Banana" className={styles.svgBanana} />
            <svg viewBox="0 0 1400 500" xmlns="http://www.w3.org/2000/svg" className={styles.svgLeaves}>
                <image href={leaves} width="100%" height="100%" />
            </svg>
            <img src={strawberry} alt="Strawberry" className={styles.svgStrawberry} />
        </div>
    );
};

export default BackgroundSVG;
