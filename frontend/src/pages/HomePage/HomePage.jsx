import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import { openModal, closeModal } from "../../redux/modalSlice";
import Logo from "../../components/Logo/Logo";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import styles from "./HomePage.module.css"; 
import productsData from "../../data/products.json"; 
import BackgroundSVG from "../../components/BackgroundSvg/BackgroundSvg";
import backButtonModal from '../../assets/backButtonModal.svg';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.loader.isLoading);
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [desiredWeight, setDesiredWeight] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [calories, setCalories] = useState(null);
    const [forbiddenFoods, setForbiddenFoods] = useState([]);

    const calculateCalories = (e) => {
        e.preventDefault();
        if (!height || !age || !currentWeight || !desiredWeight || !bloodType) {
            alert("Please fill in all fields.");
            return;
        }

        dispatch(showLoader()); 

        setTimeout(() => {
            const dailyCalories = (10 * currentWeight) + (6.25 * height) - (5 * age) - 161 - (10 * (currentWeight - desiredWeight));
            setCalories(Math.round(dailyCalories));

            const bloodIndex = parseInt(bloodType, 10);
            if (bloodIndex < 1 || bloodIndex > 4) return;

            const filteredProducts = productsData.filter(product => product.groupBloodNotAllowed[bloodIndex] === true);
            setForbiddenFoods(filteredProducts);

            dispatch(hideLoader()); 
            dispatch(openModal()); 
        }, 1000);
    };

    const handleStartLosingWeight = () => {
        dispatch(closeModal());
        setTimeout(() => {
            navigate("/login");
        }, 300);
    };

    return (
        <div className={styles.home1}>
          <div className={styles.home}><BackgroundSVG /> </div>

        <div className="homeContainer">
           
            {isLoading && <Loader />}

            <header className={styles.header}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.verticalBar}></div>
                <nav className={styles.nav}>
                    <Link to="/login" className={styles.navLink}>Log in</Link>
                    <Link to="/register" className={styles.navLink}>Registration</Link>
                </nav>
            </header>
            <div className={styles.headerBar}></div>
           
            {!(location.pathname === "/login" || location.pathname === "/register") && (
                <>
                    <h1 className={styles.title}>
                        Calculate your daily calorie intake right now
                    </h1>
                    <form className={styles.formContainer} onSubmit={calculateCalories}>
                        <div className={styles.leftColumn}>
                            <input type="number" placeholder="Height (cm) *" value={height} onChange={(e) => setHeight(e.target.value)} className={styles.inputField} />
                            <input type="number" placeholder="Age *" value={age} onChange={(e) => setAge(e.target.value)} className={styles.inputField} />
                            <input type="number" placeholder="Current weight *" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} className={styles.inputField} />
                        </div>

                        <div className={styles.rightColumn}>
                            <input type="number" placeholder="Desired weight *" value={desiredWeight} onChange={(e) => setDesiredWeight(e.target.value)} className={styles.inputField} />
                            <div className={styles.bloodTypeContainer}>
                                <label className={styles.bloodTypeLabel}>Blood Type*</label>
                                <ul className={styles.bloodTypeOptions}>
                                    {[1, 2, 3, 4].map((type) => (
                                        <li key={type}>
                                            <input type="radio" name="bloodType" value={type} checked={bloodType === String(type)} onChange={(e) => setBloodType(e.target.value)} />
                                            <span>{type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <button type="submit" className={styles.submitButton}>Start losing weight</button>
                    </form>
                </>
            )}

{isModalOpen && (
    <div className={styles.backButtonBar}>
        <img
            src={backButtonModal}
            alt="Back"
            className={styles.svgBackButtonModal}
            onClick={() => dispatch(closeModal())} 
        />
    </div>
)}

            {isModalOpen && (
                <Modal onClose={() => dispatch(closeModal())}>
                    
                    <h2 className={styles.titleModal}>Your recommended daily calorie intake is</h2>
                    <p className={styles.caloriesNumber}>{calories} kcal</p>
                    <hr className={styles.modalDivider} />
                    <h3 className={styles.title2}>Foods you should avoid:</h3>
                    <ol className={styles.forbiddenList}>
                        {forbiddenFoods.length > 0 ? (
                            forbiddenFoods.map((food, index) => (
                                <li key={food._id.$oid}>{index + 1}. {food.title}</li>
                            ))
                        ) : (
                            <li>No restricted foods found.</li>
                        )}
                    </ol>
                    <button className={styles.startButtonModal} onClick={handleStartLosingWeight}>
                        Start losing weight
                    </button>
                </Modal>
            )}
        </div></div>
    );
};

export default HomePage;
