/* eslint-disable @next/next/no-img-element */
import { Box, Button, LinearProgress, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { ContributionItem, FormInputText } from '../../components';
import { useLendingDetailsEffects } from './LendingDetails.effects';
import { useStyles } from './LendingDetails.styles';

export const LendingDetails: FC = () => {
  const classes = useStyles();
  const { control, handleSubmit, onSubmit, onRedeemSlt, accountBalance, contributionList, tokensRedeemed, tokenLimit } =
    useLendingDetailsEffects();

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
              hint='Max. 200 EWT per user'
            />
            <Box mt={2} className={classes.details}>
              <Typography variant='body2'>Expected simple interest rate</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                10%
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Contribution deadline</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                16-Apr-22
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Solar loans distributed</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                17-Apr-22
              </Typography>
            </Box>
            <Box className={classes.details}>
              <Typography variant='body2'>Solar loans mature</Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                17-Apr-22
              </Typography>
            </Box>
            <Box className={classes.disclaimer}>
              <Typography variant='body2'>By clicking &quot;LEND&quot;, you acknowledge</Typography>
              <Link href='#' variant='body2' target='_blank' color='primary' underline='hover'>
                this disclaimer
              </Link>
            </Box>
            <Box className={classes.buttonWrapper} mt={2}>
              <Button variant='contained' type='submit' color='primary' style={{ minWidth: '200px' }}>
                Lend
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <div className={classes.divider}></div>
      <Box className={classes.contributionWrapper}>
        <Box className={classes.contribution}>
          <ContributionItem title='Your contribution' value={contributionList.contribution} type='EWT' />
          <ContributionItem title='Solar loan token balance' value={contributionList.tokenBalance} type='SLT' />
          <ContributionItem title='Redeemable reward' value={contributionList.redeemableReward} type='EWT' />
        </Box>
        <Box>
          <Button variant='contained' color='primary' style={{ minWidth: '200px' }} onClick={onRedeemSlt}>
            Redeem SLT
          </Button>
        </Box>
      </Box>
      <Box className={classes.progress}>
        <LinearProgress
          style={{ height: 10, borderRadius: 5 }}
          value={(tokensRedeemed / tokenLimit) * 100}
          variant='determinate'
          color='primary'
        />
        <Typography variant='h5'>
          {(tokensRedeemed / tokenLimit) * 100}% of {tokenLimit} EWT Personal Limit
        </Typography>
      </Box>
    </Box>
  );
};
