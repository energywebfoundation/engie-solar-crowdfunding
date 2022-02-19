import { Box, Typography, Button } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './Contact.styles';

export const Contact: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Typography variant='h3'>Contact us today to find out how we can help you.</Typography>
      <Typography variant='h5'>changing fire safety one building at a time</Typography>
      <Button style={{ width: '200px' }} variant='contained'>
        Contact us
      </Button>
    </Box>
  );
};
