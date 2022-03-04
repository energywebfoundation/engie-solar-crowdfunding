/* eslint-disable @next/next/no-img-element */
import { Box, Paper, Button, CircularProgress, Link, Typography, Divider } from '@mui/material';
import { FC } from 'react';
import { ContributionItem, FormInputText, ProgressBar } from '../../components';
import { RoleEnrollmentStatus } from '../../redux-store';
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
    formatDate,
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
  } = useLendingDetailsEffects();

  return (
    <Paper className={classes.wrapper}>
      <Box className={classes.lendingContainer}>
        <Box className={classes.lendingTitle}>
          <Typography mb={2} variant='h3'>
            Lending Details
          </Typography>
          {!isReady ? (
            <CircularProgress />
          ) : (
            <ContributionItem title='Your account balance' value={accountBalance} type='EWT' />
          )}
        </Box>
        <Box className={classes.formContainer}>
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
              <Typography variant='body2'>Activate staking</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(activateStackingDate)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Close Stacking</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(closeStackingDate)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Lock Stakes</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(lockStakesDate)}
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Release Rewards</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {formatDate(releaseRewardsDate)}
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
              {smartContractLoading ? (
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  variant='contained'
                  type='submit'
                  color='primary'
                  disabled={
                    !!errorMessage || roleEnrolmentStatus !== RoleEnrollmentStatus.ENROLLED_SYNCED || isStackingDisabled
                  }
                  style={{ minWidth: '200px' }}
                >
                  Lend
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
            className={classes.contributionItem}
            title='Solar loan token balance'
            value={solarLoanTokenBalance}
            type='SLT'
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
          <Box className={classes.progressBarItem}>
            <ProgressBar value={solarLoanTokenBalance} limit={tokenLimit} description='SLT Timeline' />
          </Box>
          <Box className={classes.redeemAction}>
            {smartContractLoading ? (
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                disabled={isRedeemDisabled}
                variant='outlined'
                color='primary'
                style={{ minWidth: '200px' }}
                onClick={onRedeemSlt}
              >
                Redeem SLT
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
