/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './Welcome.styles';

export const Welcome: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <img className={classes.imageContainer} src='/PeopleInAfrica.svg' alt='Children in Africa' />
      <Typography variant='h2' color='common.black'>
        Stake your Energy Web Token to provide Energy Access
      </Typography>
      <Typography variant='h5' color='common.black'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra duis mi risus habitasse fusce purus. Lectus
        quam amet, fermentum et neque, aliquet faucibus.
      </Typography>
      <Typography variant='h5' color='common.black'>
        Sit nibh aliquet tristique mi, pharetra, commodo massa consectetur. Eu non nunc, elit diam. Diam parturient ut
        sapien id.
      </Typography>
    </Box>
  );
};
