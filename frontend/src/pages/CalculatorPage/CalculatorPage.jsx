import React, { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { setDailyCalories, setForbiddenFoods } from "../../redux/caloriesSlice"; 
import styles from "./CalculatorPage.module.css";

const CalculatorPage = () => {
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [desiredWeight, setDesiredWeight] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    // Preluăm data selectată din Redux
    const selectedDate = useSelector((state) => state.calories.selectedDate);
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    const calculateCalories = async (e) => {
        e.preventDefault();
        setError("");

        if (!height || !age || !currentWeight || !desiredWeight || !bloodType) {
            setError("Please fill in all fields!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/calories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ height, age, weight: currentWeight, desiredWeight, bloodType }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Calculation failed");
            }

            console.log(" Dispatching setDailyCalories for", formattedDate, "Calories:", data.dailyCalories);
            console.log(" Forbidden Foods Received:", data.forbiddenFoods);

            dispatch(setDailyCalories({ date: formattedDate, calories: data.dailyCalories }));
            if (Array.isArray(data.forbiddenFoods)) {
                dispatch(setForbiddenFoods(data.forbiddenFoods));
            } else {
                console.warn("⚠️ Received invalid forbiddenFoods data:", data.forbiddenFoods);
            }
            

            console.log(" Dispatching forbiddenFoods:", data.forbiddenFoods);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.calculatorPage}>
           
            <h1 className={styles.title}>Calculate your daily calorie intake right now</h1>
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
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default CalculatorPage;
