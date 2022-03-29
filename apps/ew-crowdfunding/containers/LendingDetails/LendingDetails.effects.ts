import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAccountBalance,
  getActivateStackingDate,
  getCloseStackingDate,
  getGlobalTokenLimit,
  getRedeemableReward,
  getLockStakesDate,
  getReleaseRewardsDate,
  getSolarLoanTokenBalance,
  getTokenLimit,
  getUserContribution,
  lend,
  redeemSlt,
  selectAccountBalance,
  selectActivateStackingDate,
  selectAddress,
  selectContributionDeadline,
  selectGlobalTokenLimit,
  selectProvider,
  selectRedeemableReward,
  selectRoleEnrollmentStatus,
  selectSmartContractLoading,
  selectLockStakesDate,
  selectReleaseRewardsDate,
  selectSolarLoanTokenBalance,
  selectTokenLimit,
  selectUserContribution,
  getContractStatus,
  selectIsPaused,
  selectIsTerminated,
  getFinalStopDate,
  redeemAllSlt,
  selectFinalStopDate,
} from '../../redux-store';
import { propertyExists } from '../../utils';
import { useContractStatus } from '../../hooks';

export const useLendingDetailsEffects = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState<boolean>(undefined);
  const roleEnrolmentStatus = useSelector(selectRoleEnrollmentStatus);

  const provider = useSelector(selectProvider);
  const currentAddress = useSelector(selectAddress);
  const contractStatus = useContractStatus();

  useEffect(() => {
    if (propertyExists(provider)) {
      dispatch(getContractStatus(provider));
    }
  }, [contractStatus, dispatch]);

  const smartContractLoading = useSelector(selectSmartContractLoading);

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatchModals = useDSLAModalsDispatch();

  useEffect(() => {
    if (propertyExists(provider) && propertyExists(currentAddress)) {
      dispatch(getAccountBalance(provider, currentAddress));
      dispatch(getGlobalTokenLimit(provider));
      dispatch(getTokenLimit(provider));
      dispatch(getActivateStackingDate(provider));
      dispatch(getCloseStackingDate(provider));
      dispatch(getLockStakesDate(provider));
      dispatch(getReleaseRewardsDate(provider));
      dispatch(getFinalStopDate(provider));
      dispatch(getUserContribution(provider));
      dispatch(getSolarLoanTokenBalance(provider, currentAddress));
      dispatch(getRedeemableReward(provider));
      dispatch(getContractStatus(provider));
    }
  }, []);

  const accountBalance = useSelector(selectAccountBalance);
  const tokenLimit = useSelector(selectTokenLimit);
  const globalTokenLimit = useSelector(selectGlobalTokenLimit);
  const userContribution = useSelector(selectUserContribution);
  const solarLoanTokenBalance = useSelector(selectSolarLoanTokenBalance);
  const redeemableReward = useSelector(selectRedeemableReward);

  const interestRate = process.env.NEXT_PUBLIC_INTEREST_RATE;

  const activateStackingDate = new Date(useSelector(selectActivateStackingDate));
  const closeStackingDate = new Date(useSelector(selectContributionDeadline));
  const lockStakesDate = new Date(useSelector(selectLockStakesDate));
  const releaseRewardsDate = new Date(useSelector(selectReleaseRewardsDate));
  const fullStopDate = new Date(useSelector(selectFinalStopDate));

  // Contract status
  const isContractPaused = useSelector(selectIsPaused);
  const isContractTerminated = useSelector(selectIsTerminated);

  useEffect(() => {
    if (propertyExists(accountBalance)) {
      setIsReady(true);
    }
  }, [accountBalance]);

  const isStackingDisabled = new Date() < activateStackingDate || new Date() >= closeStackingDate;
  const isRedeemDisabled =
    new Date() < activateStackingDate || (new Date() >= closeStackingDate && new Date() < releaseRewardsDate) || new Date() > fullStopDate || redeemableReward === 0;

  const validationSchema = yup
    .object({
      loan: yup
        .number()
        .typeError('EWT Stake Amount is required')
        .min(0.51)
        .max(tokenLimit || 400)
        .required('EWT Stake Amount is required')
        .label('EWT Stake Amount'),
    })
    .required('EWT Stake Amount is required');

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onLendEwt = (loan: number) => {
    if (!loan || !provider || !currentAddress) {
      return;
    }
    dispatch(lend(loan, dispatchModals, provider, currentAddress));
  };

  const onSubmit = async (data: { loan: number }) => {
    if (errorMessage || isStackingDisabled || isContractPaused || isContractTerminated) {
      return;
    }

    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_LEND,
      payload: {
        open: true,
        amount: data.loan,
        onLend: onLendEwt,
      },
    });
  };

  const onRedeem = (amount: number) => {
    if (!provider || !amount || !currentAddress || isRedeemDisabled) {
      return;
    }
    dispatch(redeemSlt(amount, provider, currentAddress));
  };

  const onRedeemAll = () => {
    dispatch(redeemAllSlt(provider, currentAddress));
  }

  const onRedeemSlt = () => {
    if (isRedeemDisabled) {
      return;
    }
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_REDEEM,
      payload: {
        open: true,
        tokenBalance: redeemableReward,
        onRedeem,
        onRedeemAll,
      },
    });
  };

  const onLoanChange = () => {
    const loan = Number(getValues('loan'));
    setErrorMessage(getErrorMessage(loan));
  };

  const getErrorMessage = (loanValue: number) => {
    if (loanValue?.toString().length > 7) {
      return 'You reached the maximum digits';
    }
    /* EWT Stake Amount” box greater than */
    if (loanValue > Number(accountBalance)) {
      /* their account balance */
      return 'Amount exceeds account balance';
    } else if (loanValue > Number(tokenLimit)) {
      /* their personal limit of 200 EWT */
      return 'Amount exceeds personal limit';
    } else if (loanValue + Number(solarLoanTokenBalance) > Number(globalTokenLimit)) {
      /* an amount that makes the total contribution exceed the global limit (10,000 EWT) */ // This needs to be checked
      return 'Amount exceeds global limit';
    } else {
      return;
    }
  };

  return {
    globalTokenLimit,
    interestRate,
    closeStackingDate,
    lockStakesDate,
    releaseRewardsDate,
    userContribution,
    solarLoanTokenBalance,
    redeemableReward,
    control,
    handleSubmit,
    onSubmit,
    errors,
    onRedeemSlt,
    accountBalance,
    tokenLimit,
    onLoanChange,
    errorMessage,
    isRedeemDisabled,
    isReady,
    roleEnrolmentStatus,
    smartContractLoading,
    activateStackingDate,
    isStackingDisabled,
    isContractPaused,
    isContractTerminated,
  };
};
