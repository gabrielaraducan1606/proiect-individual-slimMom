import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeConsumedFood } from "../../redux/caloriesSlice";
import styles from "./DiaryProductsList.module.css";

const DiaryProductsList = ({ selectedDate }) => {
    const dispatch = useDispatch();
    const listRef = useRef(null);
    const [lastIndex, setLastIndex] = useState(null);
    const [isScrolling, setIsScrolling] = useState(false);

    // ✅ Formatăm data selectată
    const formattedDate =
        selectedDate instanceof Date
            ? selectedDate.toISOString().split("T")[0]
            : new Date(selectedDate).toISOString().split("T")[0];

    // ✅ Obținem lista de alimente consumate pentru data selectată
    const consumedFoods = useSelector((state) => state.calories.consumedFoods[formattedDate] || []);

    // 🔥 Scroll automat către ultimul element adăugat
    useEffect(() => {
        if (consumedFoods.length > 0) {
            setLastIndex(consumedFoods.length - 1);
            if (listRef.current) {
                listRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end" });
            }
        }
    }, [consumedFoods]);

    // 🔥 Detectează scroll-ul și elimină efectul ombre temporar
    const handleScroll = () => {
        setIsScrolling(true);
        setTimeout(() => {
            setIsScrolling(false);
        }, 1000); // După 1 secundă, ombre-ul revine
    };

    return (
        <div className={styles.productsListContainer} onScroll={handleScroll}>
            {consumedFoods.length === 0 ? (
                <p>No products added yet.</p>
            ) : (
                <ul className={styles.productsList} ref={listRef}>
                    {consumedFoods.map((food, index) => (
                        <li
                            key={index}
                            className={index === lastIndex && !isScrolling ? styles.ombreItem : ""}
                        >
                            <span className={styles.productName}>{food.name}</span>
                            <span className={styles.productWeight}>{food.weight}g</span>
                            <span className={styles.productCalories}>{food.calories.toFixed(2)} kcal</span>
                            <button
                                className={styles.deleteButton}
                                onClick={() => dispatch(removeConsumedFood({ date: formattedDate, index }))}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DiaryProductsList;
