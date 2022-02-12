/* eslint-disable @next/next/no-img-element */
import { Box, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './Welcome.styles';

export const Welcome: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <img className={classes.imageContainer} src='/PeopleInAfrica.svg' alt='Children in Africa' />
      <Paper className={classes.paper}>
        <Typography variant='h3' color='common.black'>
          Stake your Energy Web Tokens to provide Energy Access
        </Typography>
        <Typography variant='h5' color='common.black'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut lectus nec ante congue gravida. Nunc
          ligula arcu, sodales commodo auctor eget, auctor vel tellus. Nunc egestas sem eu malesuada porta. Phasellus
          mattis sagittis magna id commodo. Maecenas vulputate tortor vitae sapien vehicula varius.
        </Typography>
        <Typography variant='h5' color='common.black'>
          Sed tincidunt lorem ut ante feugiat, at vehicula nibh scelerisque. Suspendisse potenti. Vestibulum et porta
          erat.
        </Typography>
      </Paper>
    </Box>
  );
};
