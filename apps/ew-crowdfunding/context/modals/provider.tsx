import React, { FC, createContext, useContext, useReducer } from 'react';
import { dslaModalsInitialState, dslaModalsReducer } from './reducer';
import { IDSLAModalsStore, TDSLAModalsAction } from './types';

const DSLAModalsStore = createContext<IDSLAModalsStore>(null);
const DSLAModalsDispatch = createContext<React.Dispatch<TDSLAModalsAction>>(null);

export const DSLAModalsProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(dslaModalsReducer, dslaModalsInitialState);

    return (
        <DSLAModalsStore.Provider value={state}>
            <DSLAModalsDispatch.Provider value={dispatch}>
                {children}
            </DSLAModalsDispatch.Provider>
        </DSLAModalsStore.Provider>
    );
};

export const useDSLAModalsStore = () => {
    return useContext(DSLAModalsStore);
};

export const useDSLAModalsDispatch = () => {
    return useContext(DSLAModalsDispatch);
};
