import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyCalories: 0,  
    consumedCalories: 0,  
    foodEntries: []  
};

const diarySlice = createSlice({
    name: "diary",
    initialState,
    reducers: {
        setDailyCalories: (state, action) => {
            state.dailyCalories = action.payload;
        },
        addFoodEntry: (state, action) => {
            state.foodEntries.push(action.payload);
            state.consumedCalories += action.payload.calories; 
        },
        removeFoodEntry: (state, action) => {
            const foodToRemove = state.foodEntries.find(food => food.id === action.payload);
            if (foodToRemove) {
                state.consumedCalories -= foodToRemove.calories; 
                state.foodEntries = state.foodEntries.filter(food => food.id !== action.payload);
            }
        }
    }
});

export const { setDailyCalories, addFoodEntry, removeFoodEntry } = diarySlice.actions;
export default diarySlice.reducer;
