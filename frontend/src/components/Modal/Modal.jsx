import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";
import styles from "./Modal.module.css";

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal?.isOpen || false); 

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={() => dispatch(closeModal())}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={() => dispatch(closeModal())}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
