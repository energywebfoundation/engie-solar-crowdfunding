import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import domains from 'disposable-email-domains';
import { getIamService } from '../../../context/iam';
import { RegistrationTypes } from 'iam-client-lib';
import { RoleEnrollmentStatus, selectAddress, selectProviderType, Web3ActionTypes } from '../../../redux-store';
import { useDispatch, useSelector } from 'react-redux';

export const useEmailVerificationEffects = (roleEnrolmentStatus: RoleEnrollmentStatus) => {
  const dispatch = useDispatch();

  const EMAIL_DOMAINS_WHITELIST = 'yopmail.com;yopmail.fr';
  const [errorMessage, setErrorMessage] = useState(null);

  const address = useSelector(selectAddress);
  const providerType = useSelector(selectProviderType);

  const notEnrolled = Boolean(roleEnrolmentStatus === RoleEnrollmentStatus.NOT_ENROLLED || !roleEnrolmentStatus);

  const PATRON_ROLE_VERSION = 1;

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
    if (errorMessage) {
      return;
    }
    console.log('Email: ', data);

    const { claimsService } = await getIamService(providerType);
    try {
      await claimsService.createClaimRequest({
        registrationTypes: [RegistrationTypes.OnChain],
        claim: {
          fields: [
            {
              key: 'email',
              value: data.email,
            },
          ],
          claimType: process.env.NEXT_PUBLIC_PATRON_ROLE,
          claimTypeVersion: PATRON_ROLE_VERSION,
        },
      });
      dispatch({
        type: Web3ActionTypes.UPDATE_ROLE_ENROLLMENT_STATUS,
        payload: RoleEnrollmentStatus.ENROLLED_NOT_APPROVED,
      });
    } catch (error) {
      console.log('Error creating claim request: ', error);
    }
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
