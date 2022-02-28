/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Typography, Button } from '@mui/material';
import { FC } from 'react';
import { AppContainer } from '../../components';
import { useStyles } from './Contact.styles';

export const Contact: FC = () => {
  const classes = useStyles();

  return (
    <Box py={5} className={classes.container}>
      <AppContainer>
        <Box className={classes.wrapper}>
          <Typography variant='h3'>Contact us today to find out how we can help you.</Typography>
          <Typography variant='h5'>changing fire safety one building at a time</Typography>
          <Button style={{ width: '200px' }} variant='contained'>
            Contact us
          </Button>
        </Box>
      </AppContainer>
      <img className={classes.topBubble} src='/Bubbles1.png' alt='Engie bubble' />
      <img className={classes.ellipse} src='/ContactEllipse.svg' alt='Engie bubble' />
    </Box>
  );
};
