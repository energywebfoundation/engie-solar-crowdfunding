import { IDSLAModalsStore, TDSLAModalsAction } from './types';

export enum DSLAModalsActionsEnum {
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
}

export const dslaModalsInitialState: IDSLAModalsStore = {
  notification: {
    open: false,
    config: {
      title: null,
      text: null,
    },
  },
};

export const dslaModalsReducer = (state = dslaModalsInitialState, action: TDSLAModalsAction): IDSLAModalsStore => {
  switch (action.type) {
    case DSLAModalsActionsEnum.SHOW_NOTIFICATION:
      return { ...state, notification: action.payload };
  }
};
