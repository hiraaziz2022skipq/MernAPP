import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthNav } from './auth-nav';
import Loading from './loading';
import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import {ProtectedRoute} from '../auth/protected-route'
import { Home } from './Home';
import Dashboard from './dashboard'
import Grid from '@mui/material/Grid';
import {Insert_mongodb} from './insert'
import {Search_mongodb} from './search'
import {GetDataPoints} from './getdatapoints'
import { GetData } from './getdata';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function MainNav() {

  const { loginWithRedirect } = useAuth0();
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MERN
          </Typography>
          <AuthNav />
        </Toolbar>
      </AppBar>
    </Box>


    <Grid container spacing={2}>
        
        <Grid item xs={3}>
          <Item>
            <Link to="/insert"><Button variant="contained">Insert URL</Button></Link>
            <Link to="/search"><Button variant="contained">Search</Button></Link>
            <Link to="/getdata"><Button variant="contained">Get Data Points</Button></Link>
          </Item>
        </Grid>
        
        <Grid item xs={9}>
          <Item><GetData/></Item>

          <Item>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/insert" element={<Insert_mongodb/>}/> 
                </Route>
            </Routes>
                     
              
          </Item>

          <Item>
              <Routes>
                    <Route path="/search" element={<Search_mongodb/>}/>
              </Routes>
          </Item>

          <Item>
              <Routes>
                    <Route path="/getdata" element={<GetDataPoints/>}/>
              </Routes> 
          </Item>
        </Grid>
        
    </Grid>

    
    </>
  );
}