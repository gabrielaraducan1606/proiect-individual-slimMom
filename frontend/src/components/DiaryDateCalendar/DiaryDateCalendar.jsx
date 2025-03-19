import React from "react";
import styles from "./DiaryDateCalendar.module.css";
import CalendarIcon from "../../assets/calendar 1.svg"; 

const DiaryDateCalendar = ({ selectedDate, setSelectedDate }) => {
    const dateObject = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

    const formattedDate = dateObject.toLocaleDateString("ro-RO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.datePickerWrapper} onClick={() => document.getElementById("dateInput").showPicker()}>
                <input
                    type="date"
                    id="dateInput"
                    value={dateObject.toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className={styles.hiddenDateInput}
                />
                <span className={styles.dateText}>{formattedDate}</span>
                <img src={CalendarIcon} alt="Calendar Icon" className={styles.calendarIcon} />
            </div>
        </div>
    );
};

export default DiaryDateCalendar;
