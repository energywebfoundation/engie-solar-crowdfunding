/* eslint-disable @next/next/no-img-element */
import { Box, Paper, Button, CircularProgress, Link, Typography, Divider } from '@mui/material';
import { FC } from 'react';
import { ContributionItem, FormInputText, ProgressBar } from '../../components';
import { RoleEnrollmentStatus } from '../../redux-store';
import { formatDate } from '../../utils';
import { useLendingDetailsEffects } from './LendingDetails.effects';
import { useStyles } from './LendingDetails.styles';

export const LendingDetails: FC = () => {
  const classes = useStyles();
  const {
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
  } = useLendingDetailsEffects();

  return (
    <Paper className={classes.wrapper}>
      <Box className={classes.lendingContainer}>
        <Box className={classes.lendingTitle}>
          <Typography mb={2} variant='h3'>
            Staking Details
          </Typography>
          {!isReady ? (
            <CircularProgress />
          ) : (
            <Box className={classes.balance}>
              <ContributionItem title='Your connected wallet balance' value={accountBalance} type='EWT' />
              <ContributionItem title='Solar loan token balance' value={solarLoanTokenBalance} type='SLT' />
            </Box>
          )}
        </Box>
        <Box className={classes.formContainer}>
          <form className={classes.form} autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormInputText
              name='loan'
              control={control}
              label='EWT Stake Amount'
              type='number'
              hint={`Max. ${tokenLimit} EWT per user`}
              errorMessage={errorMessage}
              valueChanged={onLoanChange}
              disabled={isStackingDisabled}
            />
            <Box mt={2} className={classes.details}>
              <Typography variant='body2'>Expected annual interest rate</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {interestRate}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Activate staking</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(activateStackingDate)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Stake until</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(closeStackingDate)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Stakes locked from</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(lockStakesDate)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Release rewards after</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(releaseRewardsDate)}
              </Typography>
            </Box>
            <Box className={classes.disclaimer}>
              <Typography variant='body2'>
                By clicking &quot;STAKE&quot;, you acknowledge{' '}
                <Link href='#' variant='body2' target='_blank' color='primary' underline='hover'>
                  this disclaimer
                </Link>
              </Typography>
            </Box>
            <Box className={classes.buttonWrapper} mt={2}>
              {smartContractLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress />
                  <Typography className='gradient-text'>This will take a minute, please do not refresh</Typography>
                </Box>
              ) : (
                <Button
                  variant='contained'
                  type='submit'
                  color='primary'
                  disabled={
                    !!errorMessage ||
                    roleEnrolmentStatus !== RoleEnrollmentStatus.ENROLLED_SYNCED ||
                    isStackingDisabled ||
                    isContractPaused ||
                    isContractTerminated
                  }
                  style={{ minWidth: '200px' }}
                >
                  STAKE
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Box>
      <Box className={classes.contributionWrapper}>
        <Box className={classes.contribution}>
          <ContributionItem
            className={classes.contributionItem}
            title='Your contribution'
            value={userContribution}
            type='EWT'
          />
          <ContributionItem
            className={classes.redeemableReward}
            title='Redeemable reward'
            value={redeemableReward}
            type='EWT'
          />
        </Box>
        <Divider className={classes.divider} />
        <Divider className={classes.separator} />
        <Box className={classes.redeem}>
          <Box className={classes.progressBarItem}>
            <ProgressBar value={userContribution} limit={tokenLimit} description='EWT Personal Limit' />
          </Box>
          <Box className={classes.redeemAction}>
            {smartContractLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress />
                <Typography className='gradient-text'>This will take a minute, please do not refresh</Typography>
              </Box>
            ) : (
              <Button
                disabled={isRedeemDisabled || isContractPaused}
                variant='outlined'
                color='primary'
                style={{ minWidth: '200px' }}
                onClick={onRedeemSlt}
              >
                Redeem SLT for EWT
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
