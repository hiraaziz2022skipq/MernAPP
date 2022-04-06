import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Insert_mongodb} from './insert'
import {Search_mongodb} from './search'
import {GetDataPoints} from './getdatapoints'
import { GetData } from './getdata';
import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Dashboard() {

  return (
    <>
    
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
                    <Route path="/insert" element={<Insert_mongodb/>}/>  
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

export default Dashboard;




