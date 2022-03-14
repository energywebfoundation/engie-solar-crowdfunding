/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './MediaText.styles';
import ReactPlayer from 'react-player';

export interface MediaTextProps {
  videoUrl: string;
  heading?: string;
  title?: string;
  text?: string;
  reverse?: boolean;
  gradientText?: boolean;
}

export const MediaText: FC<MediaTextProps> = ({
  videoUrl,
  heading,
  title,
  text,
  reverse = false,
  gradientText,
}: MediaTextProps) => {
  const classes = useStyles();

  return (
    <Box my={3} className={classes.mainWrapper}>
      {heading && (
        <Typography variant='h3' className={gradientText && 'gradient-text'}>
          {heading}
        </Typography>
      )}
      <Box className={classes.wrapper} sx={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
        <Box className={classes.mediaWrapper}>
          <ReactPlayer
            style={{ borderRadius: '0', overflow: 'hidden', width: '100%' }}
            url={videoUrl}
            controls={true}
            width='100%'
          />
        </Box>
        <Box className={classes.textWrapper}>
          {title && <Typography variant='h3'>{title}</Typography>}
          {text && <Typography variant='h5'>{text}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};
