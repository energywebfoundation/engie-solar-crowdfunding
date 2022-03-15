/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigationEffects } from './Navigation.effects';
import { useStyles } from './Navigation.styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { shortenDid } from '../../utils';
import Link from 'next/link';
import useStakingStatus from '../../context/hooks/useStakingStatus';

export const Navigation = () => {
  const classes = useStyles();

  const { authenticated, did, avatar, logout } = useNavigationEffects();
  const stakingMessage = useStakingStatus();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} mt={1} className={classes.logo}>
            <Link href='/'>
              <a>
                <img className={classes.logo} src='/EeaLogo.png' alt='Lab icon' />
              </a>
            </Link>
          </Box>
          {stakingMessage && (
            <Typography
              className={`${classes.toolbarMessage} gradient-text`}
              variant='h5'
              style={{ fontWeight: '600', textTransform: 'uppercase' }}
              align='center'
            >
              {stakingMessage}
            </Typography>
          )}
          {authenticated && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box className={classes.didContainer}>
                <Typography variant='body1' component='div' style={{ color: '#A6A5AC' }}>
                  {shortenDid(did)}
                </Typography>
                <img className={classes.avatar} src={avatar} />
              </Box>
              <Typography
                style={{ cursor: 'pointer' }}
                variant='h6'
                component='div'
                color='primary'
                ml={5}
                onClick={logout}
              >
                logout
              </Typography>
              <IconButton size='large' edge='start' color='primary' aria-label='menu' sx={{ mr: 2 }} onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
