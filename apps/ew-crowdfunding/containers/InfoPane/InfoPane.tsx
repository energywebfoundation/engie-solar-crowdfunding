import { FC } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useStyles } from './InfoPane.styles';

export const InfoPane: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} id='lendingApp'>
      <Typography variant='h2' color='common.black'>
        How Solar Crowdfunding Works
      </Typography>
      <Typography variant='h5' color='common.black'>
        By supporting the Solar Crowdfunding Pilot with your EWT, you are directly supporting expanding renewable energy
        access in the developing world. Use this site to trade your EWT for Solar Loan Tokens (SLT). Engie Energy Access
        will use the EWT you lent to fund small-scale solar + storage systems for people living in rural areas.
      </Typography>
      <Typography variant='h5' color='common.black'>
        After the recipients of these solar systems have paid off their systems, you will be able to use your SLT to
        reclaim your EWT plus a bonus equal to up to 10% of the EWT you lent. The program is expected to last 1-year
        from initiation.
      </Typography>
      <Link href='#' target='_blank' color='primary' underline='hover'>
        Announcements
      </Link>
      <Link href='#' target='_blank' color='primary' underline='hover'>
        Risks
      </Link>
      <Link href='#' target='_blank' color='primary' underline='hover'>
        Progress Reporting
      </Link>
    </Box>
  );
};
