import { Action, applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './root-reducer';

const middlewares = [logger, thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
