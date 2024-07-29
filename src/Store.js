// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const initialState = {
    quizId: null,
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QUIZ_ID':
            return { ...state, quizId: action.payload };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, quizReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
