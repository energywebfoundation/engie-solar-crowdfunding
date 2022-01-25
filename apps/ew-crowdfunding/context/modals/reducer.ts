import { IDSLAModalsStore, TDSLAModalsAction } from './types';

export enum DSLAModalsActionsEnum {
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
  SHOW_LOGIN = 'SHOW_LOGIN',
}

export const dslaModalsInitialState: IDSLAModalsStore = {
  notification: {
    open: false,
    config: {
      title: null,
      text: null,
    },
  },
  login: {
    open: false,
    isConnectedToRightNetwork: false,
    isMetamaskPresent: false,
    login: () => {
      return;
    },
  },
};

export const dslaModalsReducer = (state = dslaModalsInitialState, action: TDSLAModalsAction): IDSLAModalsStore => {
  switch (action.type) {
    case DSLAModalsActionsEnum.SHOW_NOTIFICATION:
      return { ...state, notification: action.payload };
    case DSLAModalsActionsEnum.SHOW_LOGIN:
      return { ...state, login: action.payload };
  }
};
