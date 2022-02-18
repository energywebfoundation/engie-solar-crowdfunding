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
        <Typography color='common.white' mr={2}>
          Powered by <strong>Lab.EnergyWeb</strong>
        </Typography>
        <img width={40} height={40} src='/EWLogo.png' alt='Lab icon' />
      </Box>
    </Paper>
  );
};
