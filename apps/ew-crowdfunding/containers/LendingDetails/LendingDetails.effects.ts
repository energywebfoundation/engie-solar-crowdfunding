import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAccountBalance,
  getContributionDeadline,
  getGlobalTokenLimit,
  getInterestRate,
  getRedeemableReward,
  getSolarLoansDistributed,
  getSolarLoansMature,
  getSolarLoanTokenBalance,
  getTokenLimit,
  getTokensRedeemed,
  getUserContribution,
  lend,
  redeemSlt,
  selectAccountBalance,
  selectAddress,
  selectContributionDeadline,
  selectGlobalTokenLimit,
  selectInterestRate,
  selectProvider,
  selectRedeemableReward,
  selectRoleEnrollmentStatus,
  selectSolarLoansDistributed,
  selectSolarLoansMature,
  selectSolarLoanTokenBalance,
  selectTokenLimit,
  selectTokensRedeemed,
  selectUserContribution,
} from '../../redux-store';
import { propertyExists } from '../../utils';

export const useLendingDetailsEffects = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState<boolean>(undefined);
  const roleEnrolmentStatus = useSelector(selectRoleEnrollmentStatus);

  const provider = useSelector(selectProvider);
  const currentAddress = useSelector(selectAddress);

  useEffect(() => {
    dispatch(getTokenLimit());
    dispatch(getGlobalTokenLimit());
    dispatch(getUserContribution());
    dispatch(getSolarLoanTokenBalance());
    dispatch(getRedeemableReward());
    dispatch(getTokensRedeemed());
    dispatch(getInterestRate());
    dispatch(getContributionDeadline());
    dispatch(getSolarLoansDistributed());
    dispatch(getSolarLoansMature());
  });

  useEffect(() => {
    if (propertyExists(provider) && propertyExists(currentAddress)) {
      dispatch(getAccountBalance(provider, currentAddress));
    }
  });

  const accountBalance = useSelector(selectAccountBalance);
  const tokenLimit = useSelector(selectTokenLimit);
  const globalTokenLimit = useSelector(selectGlobalTokenLimit);
  const userContribution = useSelector(selectUserContribution);
  const solarLoanTokenBalance = useSelector(selectSolarLoanTokenBalance);
  const redeemableReward = useSelector(selectRedeemableReward);
  const tokensRedeemed = useSelector(selectTokensRedeemed);

  const interestRate = useSelector(selectInterestRate);
  const contributionDeadline = useSelector(selectContributionDeadline);
  const solarLoansDistributed = useSelector(selectSolarLoansDistributed);
  const solarLoansMature = useSelector(selectSolarLoansMature);

  useEffect(() => {
    if (propertyExists(accountBalance)) {
      setIsReady(true);
    }
  }, [accountBalance]);

  const isRedeemDisabled = new Date() >= new Date(contributionDeadline);

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatchModals = useDSLAModalsDispatch();

  const formatDate = (date: string) => {
    if (!date) {
      return;
    }
    return DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yy');
  };

  const validationSchema = yup
    .object({
      loan: yup
        .number()
        .typeError('EWT Loan Amount is required')
        .min(0)
        .max(200)
        .required('EWT Loan Amount is required')
        .label('EWT Loan Amount'),
    })
    .required('EWT Loan Amount is required');

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

  const onSubmit = async (data: { loan: number }) => {
    if (errorMessage) {
      return;
    }
    dispatch(lend(data.loan));
  };

  const onRedeem = (amount: number) => {
    dispatch(redeemSlt(amount));
  };

  const onRedeemSlt = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_REDEEM,
      payload: {
        open: true,
        tokenBalance: solarLoanTokenBalance,
        onRedeem,
      },
    });
  };

  const onLoanChange = () => {
    const loan = Number(getValues('loan'));
    setErrorMessage(getErrorMessage(loan));
  };

  const getErrorMessage = (loanValue: number) => {
    /* EWT Loan Amount” box greater than */
    if (loanValue > accountBalance) {
      /* their account balance */
      return 'Amount exceeds account balance';
    } else if (loanValue > tokenLimit) {
      /* their personal limit of 200 EWT */
      return 'Amount exceeds personal limit';
    } else if (loanValue + solarLoanTokenBalance > globalTokenLimit) {
      /* an amount that makes the total contribution exceed the global limit (10,000 EWT) */ // This needs to be checked
      return 'Amount exceeds global limit';
    } else {
      return;
    }
  };

  return {
    globalTokenLimit,
    interestRate,
    contributionDeadline,
    solarLoansDistributed,
    solarLoansMature,
    userContribution,
    solarLoanTokenBalance,
    redeemableReward,
    formatDate,
    control,
    handleSubmit,
    onSubmit,
    errors,
    onRedeemSlt,
    accountBalance,
    tokensRedeemed,
    tokenLimit,
    onLoanChange,
    errorMessage,
    isRedeemDisabled,
    isReady,
    roleEnrolmentStatus,
  };
};
