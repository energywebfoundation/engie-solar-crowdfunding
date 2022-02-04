import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch } from '../../context';

export const useLendingDetailsEffects = () => {
  /* API variables */
  const accountBalance = 50.5;
  const userContribution = 100;
  const solarLoanTokenBalance = 400;
  const redeemableReward = 50;

  const tokensRedeemed = 137;
  /* End of API variables */

  /* MAIN LIMITS */
  const tokenLimit = Number(process.env.NEXT_PUBLIC_TOKEN_LIMIT);
  const globalTokenLimit = Number(process.env.NEXT_PUBLIC_GLOBAL_TOKEN_LIMIT);
  const interestRate = process.env.NEXT_PUBLIC_INTEREST_RATE;
  const contributionDeadline = process.env.NEXT_PUBLIC_CONTRIBUTION_DEADLINE;
  const solarLoansDistributed = process.env.NEXT_PUBLIC_SOLAR_LOANS_DISTRIBUTED;
  const solarLoansMature = process.env.NEXT_PUBLIC_SOLAR_LOANS_MATURE;
  /* End of limits */

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
    console.log('Loan amount: ', data);
  };

  const onRedeemSlt = () => {
    console.log('On redeem');
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_REDEEM,
      payload: {
        open: true,
        tokenBalance: solarLoanTokenBalance,
      },
    });
  };

  const onLoanChange = () => {
    const loan = Number(getValues('loan'));
    setErrorMessage(getErrorMessage(loan));
  };

  const getErrorMessage = (loanValue: number) => {
    /* EWT Loan Amount” box greater than */
    console.log(
      'Get error message here: ',
      typeof loanValue,
      typeof solarLoanTokenBalance,
      typeof (loanValue + solarLoanTokenBalance),
      loanValue + solarLoanTokenBalance > globalTokenLimit,
    );

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
  };
};
