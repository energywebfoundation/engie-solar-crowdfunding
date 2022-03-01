/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useStyles } from './ImageText.styles';

export interface ImageTextProps {
  imagePath: string;
  title: string;
  text?: string;
  reverse?: boolean;
  shadow?: boolean;
  link?: string;
  linkText?: string;
}

export const ImageText: FC<ImageTextProps> = ({
  imagePath,
  title,
  text,
  reverse = false,
  shadow = true,
  link,
  linkText,
}: ImageTextProps) => {
  const classes = useStyles();

  return (
    <Box my={3} className={classes.wrapper} sx={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
      <Box className={classes.imageWrapper}>
        <img
          className={classes.image}
          src={imagePath}
          style={{ boxShadow: shadow && '-40px 4px 40px rgba(0, 0, 0, 0.24)' }}
        />
      </Box>
      <Box className={classes.textWrapper}>
        <Typography variant='h3'>{title}</Typography>
        <Typography variant='h5'>{text}</Typography>
        {link && (
          <Typography variant='h5'>
            Learn more{' '}
            <Link href={link} target='_blank'>
              {linkText || link}
            </Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
};
