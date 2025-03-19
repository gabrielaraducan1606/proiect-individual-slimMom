import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Summary.module.css";
import leaves from '../../assets/leaves.svg';

const Summary = ({ showSvg = true }) => {
    const navigate = useNavigate();

    // ✅ Extract selected date correctly
    const selectedDate = useSelector((state) => state.calories.selectedDate);
    const formattedDate = selectedDate || new Date().toISOString().split("T")[0];

    // ✅ Memoize Redux state to prevent unnecessary re-renders
    const dailyCaloriesByDate = useSelector((state) => state.calories.dailyCaloriesByDate);
    const consumedFoods = useSelector((state) => state.calories.consumedFoods);
    const forbiddenFoods = useSelector((state) => state.calories.forbiddenFoods);

    // ✅ Ensure correct values for dailyCalories and consumedCalories
    const dailyCalories = dailyCaloriesByDate[formattedDate] || 0;
    const validConsumedFoods = useMemo(() => consumedFoods[formattedDate] || [], [consumedFoods, formattedDate]);
    const consumedCalories = validConsumedFoods.reduce((total, food) => total + food.calories, 0);

    const remainingCalories = Math.max(dailyCalories - consumedCalories, 0);
    const percentageOfDailyIntake = dailyCalories > 0 ? ((consumedCalories / dailyCalories) * 100).toFixed(1) : 0;

    // ✅ Log updates for debugging
    useEffect(() => {
        console.log("📌 [Summary] Updated for Date:", formattedDate);
        console.log("🔥 [Summary] dailyCaloriesByDate:", dailyCaloriesByDate);
        console.log("🔥 [Summary] Valid Consumed Foods:", validConsumedFoods);
        console.log("🔥 [Summary] Consumed Calories:", consumedCalories);
    }, [formattedDate, dailyCaloriesByDate, consumedCalories, validConsumedFoods]);
    
    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className={styles.summaryContainer}>
             {showSvg && <img src={leaves} alt="Leaves" className={styles.svgLeaves} />} {/* ✅ Afișează doar dacă showSvg este true */}
            <div className={styles.summaryHeader}>
                <button className={styles.navButton} onClick={() => navigate("/summary")}>Nic</button>
                <div className={styles.verticalBar}></div>
                <button className={styles.logoutButton} onClick={handleLogout}>Exit</button>
            </div>

            <h3 className={styles.summaryTitle}>Summary for {new Date(formattedDate).toLocaleDateString("ro-RO")}</h3>

            <ul className={styles.summaryList}>
                <li><span>Left</span> {remainingCalories.toFixed(2)} kcal</li>
                <li><span>Consumed</span> {consumedCalories.toFixed(2)} kcal</li>
                <li><span>Daily rate</span> {dailyCalories.toFixed(2)} kcal</li>
                <li><span>% of normal</span> {percentageOfDailyIntake}%</li>
            </ul>

            <div className={styles.forbiddenFoodsContainer}>
                <h3 className={styles.title2}>Food not recommended</h3>
                <div className={styles.scrollableForbiddenList}>
                    <ol className={styles.forbiddenList}>
                        {forbiddenFoods.length > 0 ? (
                            forbiddenFoods.map((food, index) => (
                                <li key={food._id?.$oid || food._id}>{index + 1}. {food.title}</li>
                            ))
                        ) : (
                            <li>No restricted foods found.</li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Summary;
