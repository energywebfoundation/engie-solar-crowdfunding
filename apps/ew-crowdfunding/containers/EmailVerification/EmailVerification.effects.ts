import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context';
import { RoleEnrollmentStatus } from '../../context/web3/types';
import domains from 'disposable-email-domains';

export const useEmailVerificationEffects = () => {
  const { address, role } = useContext(Web3Context);
  const notEnrolled = Boolean(role === RoleEnrollmentStatus.NOT_ENROLLED || !role);
  const EMAIL_DOMAINS_WHITELIST = 'yopmail.com;yopmail.fr';
  const [errorMessage, setErrorMessage] = useState(null);

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

  const onSubmit = async (data: { email: number }) => {
    console.log('Email: ', data);
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
