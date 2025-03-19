import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../../redux/caloriesSlice";
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";
import Summary from "../Summary/Summary";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.calories.selectedDate);

    useEffect(() => {
        if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
            console.error(" Invalid selectedDate detected. Resetting to today.");
            dispatch(setSelectedDate(new Date().toISOString().split("T")[0]));
        }
    }, [selectedDate, dispatch]);

    const handleDateChange = (newDate) => {
        if (newDate instanceof Date && !isNaN(newDate.getTime())) {
            dispatch(setSelectedDate(newDate.toISOString().split("T")[0]));
        } else {
            console.error(" Invalid date selected");
        }
    };

    console.log(" [DiaryPage] Redux Selected Date:", selectedDate);

    return (
        <div className={styles.diaryContainer}>
            <div className={styles.leftContent}>
                <DiaryDateCalendar selectedDate={new Date(selectedDate)} setSelectedDate={handleDateChange} />
                <DiaryAddProductForm selectedDate={new Date(selectedDate)} />
                <DiaryProductsList selectedDate={new Date(selectedDate)} />
            </div>

            <div className={styles.rightContent}>
            <Summary showSvg={false} />
            </div>
        </div>
    );
};

export default DiaryPage;
