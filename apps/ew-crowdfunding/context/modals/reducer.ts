import { IDSLAModalsStore, TDSLAModalsAction } from './types';

export enum DSLAModalsActionsEnum {
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
  SHOW_LOGIN = 'SHOW_LOGIN',
  SHOW_REDEEM = 'SHOW_REDEEM',
  SHOW_CONFIRM = 'SHOW_CONFIRM',
  SHOW_CONGRATS = 'SHOW_CONGRATS',
  SHOW_LEND = 'SHOW_LEND',
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
  redeem: {
    open: false,
    tokenBalance: null,
    releaseRewardsDate: null,
    onRedeem: (amount: number) => {
      return;
    },
    onRedeemAll: () => {
      return;
    },
  },
  confirm: {
    open: false,
    title: null,
    text: null,
    onConfirm: () => {
      return;
    },
  },
  congrats: {
    open: false,
  },
  lend: {
    open: false,
    amount: null,
    onLend: (amount: number) => {
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
    case DSLAModalsActionsEnum.SHOW_REDEEM:
      return { ...state, redeem: action.payload };
    case DSLAModalsActionsEnum.SHOW_CONFIRM:
      return { ...state, confirm: action.payload };
    case DSLAModalsActionsEnum.SHOW_CONGRATS:
      return { ...state, congrats: action.payload };
    case DSLAModalsActionsEnum.SHOW_LEND:
      return { ...state, lend: action.payload };
  }
};
