import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { DSLAModalsActionsEnum, useDSLAModalsDispatch, useDSLAModalsStore } from '../../../context';

export const useRedeemEffects = () => {
  const {
    redeem: { open, tokenBalance, onRedeem },
  } = useDSLAModalsStore();
  const dispatchModals = useDSLAModalsDispatch();

  const closeModal = () => {
    dispatchModals({
      type: DSLAModalsActionsEnum.SHOW_REDEEM,
      payload: {
        open: false,
        tokenBalance: null,
        onRedeem,
      },
    });
  };

  const [redeemAll, setRedeemAll] = useState(false);

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

  const handleRedeemAll = () => {
    setRedeemAll(!redeemAll);
    if (!redeemAll === true) {
      setValue('amount', tokenBalance);
    } else {
      reset();
    }
  };

  const onSubmit = async (data: { amount: number }) => {
    console.log('Stake amount: ', data);
    onRedeem(data.amount);
    onReset();
  };

  const onReset = () => {
    reset();
    setRedeemAll(false);
    closeModal();
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    open,
    closeModal,
    tokenBalance,
    onReset,
    redeemAll,
    handleRedeemAll,
  };
};
