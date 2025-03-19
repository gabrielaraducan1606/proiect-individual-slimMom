import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyCaloriesByDate: {},
    consumedFoods: {},
    selectedDate: new Date().toISOString().split("T")[0],
    forbiddenFoods: [], // ✅ Asigură-te că este inițializat corect
}

const caloriesSlice = createSlice({
    name: "calories",
    initialState,
    reducers: {
        setDailyCalories: (state, action) => {
            const { date, calories } = action.payload;
            state.dailyCaloriesByDate = { ...state.dailyCaloriesByDate, [date]: calories };
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;  // ✅ Stocăm data exactă fără conversie
            console.log("🛠 [Redux] Updated selectedDate:", state.selectedDate);
        },
        
        addConsumedFood: (state, action) => {
            const { date, name, weight, calories } = action.payload;
            if (!state.consumedFoods[date]) {
                state.consumedFoods[date] = [];
            }
            state.consumedFoods[date].push({ name, weight, calories });
        },
        removeConsumedFood: (state, action) => {
            const { date, index } = action.payload;
            if (state.consumedFoods[date]) {
                state.consumedFoods[date].splice(index, 1);
                if (state.consumedFoods[date].length === 0) {
                    delete state.consumedFoods[date];
                }
            }
        },
        setForbiddenFoods: (state, action) => {
            state.forbiddenFoods = action.payload; // ✅ Setează lista produselor nerecomandate
        },
    },
});

export const { setDailyCalories, setSelectedDate, addConsumedFood, removeConsumedFood, setForbiddenFoods } = caloriesSlice.actions;
export default caloriesSlice.reducer;
