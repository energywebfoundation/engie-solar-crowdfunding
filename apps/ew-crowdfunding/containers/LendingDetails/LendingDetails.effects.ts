import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';

export const useLendingDetailsEffects = () => {
  const validationSchema = yup
    .object({
      loan: yup.number().min(0).max(200).required('EWT Loan Amount is required').label('EWT Loan Amount'),
    })
    .required('EWT Loan Amount is required');

  const {
    handleSubmit,
    control,
    reset,
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
    console.log('Loan amount: ', data);
  };

  const onRedeemSlt = () => {
    console.log('On redeeem');
  };

  const accountBalance = 0.1;

  const contributionList = {
    contribution: 100.0,
    tokenBalance: 100.0,
    redeemableReward: 0.0,
  };

  const tokensRedeemed = 1370;
  const tokenLimit = 2000;


  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    onRedeemSlt,
    accountBalance,
    contributionList,
    tokensRedeemed,
    tokenLimit
  };
};
