import React, {useState} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../App.css';
import { blueGrey } from '@mui/material/colors';
import Alert from '@mui/material/Alert';

const api =axios.create({
  baseURL: 'https://hufoxi5q95.execute-api.us-west-1.amazonaws.com/prod'
})

export const Update_mongodb = () => {

  const [oldurls,setoldurl] = useState([])
  const [updateurls,setupdateurl] = useState([])
  const [response, setresponse]= useState([]);            // for setting response from addURL
  const [print, setprint] = useState();  

  async function updateURL(){

    try{
      
      let res = await api.put("/",
      {url:oldurls,updateurl:updateurls});

      setresponse(res.data[0].url)
      setprint(true)
      setTimeout(function(){
        setprint(false)
      },3000);
      console.log(res.data[0].url)
      }
      catch(err){
        console.log(err)
      }
  }


      
      const cardupdate = (
        <React.Fragment>
          <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Enter Old URL
            </Typography>
    
            <Typography variant="h5" component="div">
            <TextField
              required
              id="filled-required"
              variant="filled"
              onChange={(event) => {setoldurl(event.target.value)}}
            />
            </Typography>
            <Typography sx={{ fontSize: 14,  }} color="text.secondary" gutterBottom>
              Enter New URL
            </Typography>
            <Typography variant="h5" component="div" >
            <TextField
              required
              id="filled-required"
              variant="filled"
              onChange={(event) => {setupdateurl(event.target.value)}}
            />
            </Typography>
    
          </CardContent>
          <CardActions>
          <Button variant="contained"  onClick={updateURL}>Update</Button>
          </CardActions>
        </React.Fragment>
      );

      
    return(
      <>

      <Box sx={{ minWidth: 275, width: 700, backgroundColor:'grey' }}>
      <Card variant="outlined" >{cardupdate}</Card>
      {print?<Alert severity="success">{response}</Alert>:null}
      </Box>
      
      </>
    )
}