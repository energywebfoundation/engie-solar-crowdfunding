/* eslint-disable @next/next/no-img-element */
import { Box, Button, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { ContributionItem, FormInputText, ProgressBar } from '../../components';
import { useLendingDetailsEffects } from './LendingDetails.effects';
import { useStyles } from './LendingDetails.styles';

export const LendingDetails: FC = () => {
  const classes = useStyles();
  const {
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
    onRedeemSlt,
    accountBalance,
    tokensRedeemed,
    tokenLimit,
    onLoanChange,
    errorMessage,
  } = useLendingDetailsEffects();

  return (
    <Box className={`${classes.wrapper} gradientBorder`}>
      <Box className={classes.lendingDetails}>
        <Box className={classes.box}>
          <Typography mb={2} variant='h2'>
            Lending Details
          </Typography>
          <ContributionItem title='Your account balance' value={accountBalance} type='EWT' />
        </Box>
        <Box className={classes.box}>
          <form className={classes.form} autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormInputText
              name='loan'
              control={control}
              label='EWT Loan Amount'
              type='number'
              hint={`Max. ${tokenLimit} EWT per user`}
              errorMessage={errorMessage}
              valueChanged={onLoanChange}
            />
            <Box mt={2} className={classes.details}>
              <Typography variant='body2'>Expected simple interest rate</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {interestRate}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Contribution deadline</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(contributionDeadline)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Solar loans distributed</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(solarLoansDistributed)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Solar loans mature</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(solarLoansMature)}
              </Typography>
            </Box>
            <Box className={classes.disclaimer}>
              <Typography variant='body2'>
                By clicking &quot;LEND&quot;, you acknowledge{' '}
                <Link href='#' variant='body2' target='_blank' color='primary' underline='hover'>
                  this disclaimer
                </Link>
              </Typography>
            </Box>
            <Box className={classes.buttonWrapper} mt={2}>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                disabled={!!errorMessage}
                style={{ minWidth: '200px' }}
              >
                Lend
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <div className={classes.divider}></div>
      <Box className={classes.contributionWrapper}>
        <Box className={classes.contribution}>
          <ContributionItem title='Your contribution' value={userContribution} type='EWT' />
          <ContributionItem title='Solar loan token balance' value={solarLoanTokenBalance} type='SLT' />
          <ContributionItem title='Redeemable reward' value={redeemableReward} type='EWT' />
        </Box>
        <Box>
          <Button variant='contained' color='primary' style={{ minWidth: '200px' }} onClick={onRedeemSlt}>
            Redeem SLT
          </Button>
        </Box>
      </Box>
      <ProgressBar value={tokensRedeemed} limit={tokenLimit} description='EWT Personal Limit' />
    </Box>
  );
};
