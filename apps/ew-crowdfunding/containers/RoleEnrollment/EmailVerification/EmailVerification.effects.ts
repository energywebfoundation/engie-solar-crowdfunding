import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import domains from 'disposable-email-domains';
import { createClaimRequest, RoleEnrollmentStatus, selectAddress } from '../../../redux-store';
import { useDispatch, useSelector } from 'react-redux';

export const useEmailVerificationEffects = (roleEnrolmentStatus: RoleEnrollmentStatus) => {
  const dispatch = useDispatch();

  const EMAIL_DOMAINS_WHITELIST = 'yopmail.com;yopmail.fr';
  const [errorMessage, setErrorMessage] = useState(null);

  const address = useSelector(selectAddress);

  const notEnrolled = Boolean(roleEnrolmentStatus === RoleEnrollmentStatus.NOT_ENROLLED || !roleEnrolmentStatus);

  const validationSchema = yup
    .object({
      email: yup.string().email().required('Email is required').label('Email'),
    })
    .required('Email is required');

  const {
    handleSubmit,
    control,
    getValues,
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

  const onSubmit = async (data: { email: string }) => {
    if (errorMessage) {
      return;
    }
    dispatch(createClaimRequest(data.email));
  };

  const onEmailChange = () => {
    const email = getValues('email');
    setErrorMessage(emailBlacklistValidator(domains, email));
  };

  const emailBlacklistValidator = (disposableDomains: string[], email: string) => {
    const [, domain] = email.split('@');
    const whiteListedDomains = EMAIL_DOMAINS_WHITELIST;
    const isWhitelisted = whiteListedDomains?.indexOf(domain) >= 0;
    const isDisposable = disposableDomains.includes(domain) && !isWhitelisted;
    if (isDisposable) {
      return 'Email domain not allowed';
    }
    return null;
  };

  return {
    address,
    notEnrolled,
    control,
    handleSubmit,
    onSubmit,
    errors,
    onEmailChange,
    errorMessage,
  };
};
