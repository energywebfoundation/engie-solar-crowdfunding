import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';

export const useRedeemEffects = () => {
  const {
    redeem: { open, tokenBalance, onRedeem, onRedeemAll },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();

  const amountWithdrawals = [25, 50, 75, 100];
  const [isRedeemAll, setIsRedeemAll] = useState(false);

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_REDEEM,
      payload: {
        open: false,
        tokenBalance: null,
        onRedeem,
        onRedeemAll,
      },
    });
  };

  const validationSchema = yup
    .object({
      amount: yup
        .number()
        .typeError('Claim Amount is required')
        .min(0)
        .max(tokenBalance)
        .required('Claim Amount is required')
        .label('Claim Amount'),
    })
    .required('Claim Amount is required');

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleRedeemPartial = (amount: number) => {
    let redeemValue;
    if (amount === 100) {
      redeemValue = tokenBalance;
      setIsRedeemAll(true);
    } else {
      setIsRedeemAll(false);
      redeemValue = (tokenBalance * amount) / 100;
    }
    setValue('amount', redeemValue);
  };

  const onSubmit = async (data: { amount: number }) => {
    if (isRedeemAll) {
      console.log('Calling redeem all');
      onRedeemAll();
    } else {
      onRedeem(data.amount);
    }
    onReset();
  };

  const onReset = () => {
    reset();
    closeModal();
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    open,
    tokenBalance,
    onReset,
    handleRedeemPartial,
    amountWithdrawals,
  };
};
