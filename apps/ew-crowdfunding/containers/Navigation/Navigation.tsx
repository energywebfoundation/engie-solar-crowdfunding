/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigationEffects } from './Navigation.effects';
import { useStyles } from './Navigation.styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { shortenDid } from '../../utils';

export const Navigation = () => {
  const classes = useStyles();
  const { authenticated, did, avatar, logout } = useNavigationEffects();
  return (
    authenticated && (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' className={classes.appBar}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* <img width={40} height={40} src='/Logo.png' alt='Lab icon' />
              <Typography variant='h6' component='div'>
                Engie Africa
              </Typography> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography variant='body1' component='div' style={{ color: '#A6A5AC' }}>
                {shortenDid(did)}
              </Typography>
              <img className={classes.avatar} src={avatar} />
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
          </Toolbar>
        </AppBar>
      </Box>
    )
  );
};
