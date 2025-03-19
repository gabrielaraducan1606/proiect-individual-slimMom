import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";
import Logo from "../Logo/Logo";
import styles from "./MobileMenuModal.module.css";

const MobileMenuModal = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalHeader}>
                <Logo className={styles.logo} />
                <button className={styles.closeButton} onClick={() => dispatch(closeModal())}>×</button>
            </div>
            
            <div className={styles.modalContent}>
                <button className={styles.menuButton}>Diary</button>
                <button className={styles.menuButton}>Calculator</button>
            </div>
        </div>
    );
};

export default MobileMenuModal;
