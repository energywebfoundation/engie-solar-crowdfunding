/* eslint-disable @next/next/no-img-element */
import { Paper, Box, Typography, Link } from '@mui/material';
import { FC } from 'react';
import { useFooterEffects, SocialLink } from './Footer.effects';
import { useStyles } from './Footer.styles';

export const Footer: FC = () => {
  const classes = useStyles();
  const socialLinks = useFooterEffects();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.socialLinks}>
        {socialLinks.map((link: SocialLink) => {
          return (
            <Link href={link.url} target='_blank' className={classes.socialLink} key={`${link.name}+${link.icon}`}>
              <img src={link.icon} alt={link.name}></img>
            </Link>
          );
        })}
      </Box>
      <Box className={classes.wrapper}>
        <Typography color='common.white' style={{ fontWeight: 700 }} mr={2}>
          Powered by Lab.EnergyWeb
        </Typography>
        <img src='/EW_lab.png' alt='Lab icon' />
      </Box>
    </Paper>
  );
};
