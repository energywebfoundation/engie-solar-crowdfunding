import { FC } from 'react';
import { Container } from '@mui/material';
import { useStyles } from './AppContainer.styles';
import { theme } from '../../dsla-theme';

export interface AppContainerProps {
  children: React.ReactNode;
  darkBackground?: boolean;
  style?: React.CSSProperties;
}

export const AppContainer: FC<AppContainerProps> = ({ children, darkBackground = false, style }: AppContainerProps) => {
  const classes = useStyles();
  return (
    <Container
      maxWidth={false}
      className={classes.container}
      style={{ ...style, color: darkBackground ? theme.palette.common.white : theme.palette.common.black }}
    >
      {children}
    </Container>
  );
};
