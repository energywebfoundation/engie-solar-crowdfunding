/* eslint-disable @next/next/no-img-element */
import { Box, Link } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './SocialLinks.styles';
import { SocialLink, useSocialLinksEffects } from './SocialLinks.effects';

export const SocialLinks: FC = () => {
  const classes = useStyles();
  const socialLinks = useSocialLinksEffects();

  return (
    <Box className={classes.socialLinks}>
      {socialLinks.map((link: SocialLink) => {
        return (
          <Link href={link.url} target='_blank' className={classes.socialLink} key={`${link.name}+${link.icon}`}>
            <img src={link.icon} alt={link.name}></img>
          </Link>
        );
      })}
    </Box>
  );
};
