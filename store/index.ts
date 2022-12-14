import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { userReducer } from './reducer/user';

const rootReducer = combineReducers({ user: userReducer });

export const makeStore = () => {
    const store = configureStore({
        reducer: (state, action) => {
            switch (action.type) {
                case HYDRATE:
                    return action.payload;
                default:
                    return rootReducer(state, action);
            }
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
    return store;
};

const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });

export type RootState = ReturnType<typeof rootReducer>;
export default wrapper;
