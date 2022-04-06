import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const baseURL= 'https://h8zh52qsb0.execute-api.us-west-1.amazonaws.com/prod'
const api =axios.create({
  baseURL:  'https://h8zh52qsb0.execute-api.us-west-1.amazonaws.com/prod'
})
export const Insert_mongodb = () => {

  const [url,seturl]= useState("")                        // for setting add url value
  const [response, setresponse]= useState("");            // for setting response from addURL
  const [print, setprint] = useState(); 

 
  async function addURL(){
          try{
                  // let res = await api.post('/',{urls:url})
                const valid = url.match(/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

                if (valid!= null){
                      // let res =  await api.post('/',
                      // {urls:url});

                      let res =  await api.post('/',
                      {urls:url});
                        setresponse(res.data)
                        setprint(true)
                        setTimeout(function(){
                          setprint(false)
                        },3000);
                        console.log(`response data = ${response}`)
                        }
                
                else{
                        // setresponse("Url is invalid")
                        setprint(true)
                }
              }
            catch(err){
                  console.log(err)
                  setprint(true)
            }
            // window.location.reload(true)
  }
    
const card = (
        <React.Fragment>
          <form>
          <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Enter URL To Insert
            </Typography>
    
            <Typography variant="h5" component="div">
            <TextField
              required
              id="filled-required"
              variant="filled"
              onChange={(event) => {seturl(event.target.value)}}
            />
            </Typography>
    
            <Typography variant="body2">
            
                {print?<Alert severity="success">{response}</Alert>:null}
             
            </Typography>
            <CardActions>
          <Button variant="contained" onClick={addURL}>Insert</Button>
          </CardActions>
          </CardContent>
          
          </form>
        </React.Fragment>
  );


    return(
        <>
        <Box sx={{ minWidth: 270,  width: 400  }} >
        <Card variant="outlined" >{card}</Card>
        </Box>

        </>
    )
}