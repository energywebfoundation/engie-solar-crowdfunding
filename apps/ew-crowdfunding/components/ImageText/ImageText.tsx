/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './ImageText.styles';

export interface ImageTextProps {
  imagePath: string;
  title: string;
  text?: string;
  reverse?: boolean;
}

export const ImageText: FC<ImageTextProps> = ({ imagePath, title, text, reverse = false }: ImageTextProps) => {
  const classes = useStyles();

  return (
    <Box my={3} className={classes.wrapper} sx={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
      <Box className={classes.imageWrapper}>
        <img src={imagePath} />
      </Box>
      <Box className={classes.textWrapper}>
        <Typography variant='h3'>{title}</Typography>
        <Typography variant='h5'>{text}</Typography>
      </Box>
    </Box>
  );
};
