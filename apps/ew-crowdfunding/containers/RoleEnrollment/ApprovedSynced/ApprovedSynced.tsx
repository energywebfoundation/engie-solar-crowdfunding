import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './ApprovedSynced.styles';
import Link from 'next/link';
import { WalletCard } from '../../../components';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export const ApprovedSynced: FC = () => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <WalletCard icon='/ShieldCheck.png' colorClass='bg-success' step='step 4'>
        <Typography align='center' variant='body2' style={{ fontWeight: 500 }}>
          Congratulations
        </Typography>
        <Typography align='center' variant='body2'>
          You have verified your email and are authorized to stake
        </Typography>
      </WalletCard>

      <Link href='/wallet#lendingApp'>
        <a style={{ width: '100%' }}>
          <Button style={{ width: '100%' }} variant='contained' color='secondary' endIcon={<KeyboardDoubleArrowDownIcon />}>
            Go to lending
          </Button>
        </a>
      </Link>
    </Box>
  );
};
