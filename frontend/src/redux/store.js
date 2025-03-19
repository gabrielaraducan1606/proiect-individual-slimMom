import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import loaderReducer from "./loaderSlice";
import modalReducer from "./modalSlice";
import caloriesReducer from "./caloriesSlice";

// ✅ Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    loader: loaderReducer,
    modal: modalReducer,
    calories: caloriesReducer
});

// ✅ Persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "calories"], // ✅ Persist only selected reducers
};

// ✅ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// ✅ Persistor
const persistor = persistStore(store);

export { store, persistor };
