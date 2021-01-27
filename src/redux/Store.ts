import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { actionTypes, firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export const store = configureStore({
    reducer: {
        firebase: firebaseReducer,
        firestore: firestoreReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [actionTypes.LOGIN],
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
