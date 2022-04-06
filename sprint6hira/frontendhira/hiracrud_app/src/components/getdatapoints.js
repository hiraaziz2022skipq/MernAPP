import React, {useState} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'


const api =axios.create({
    baseURL: 'https://h8zh52qsb0.execute-api.us-west-1.amazonaws.com/prod'
  })
  
export const GetDataPoints = () => {
    
    const [urldata,seturldata]= useState([]);               // for setiing response from getURL
    const [response, setresponse]= useState([]);            // for setting response from addURL
    const [print, setprint] = useState(); 
    const [avail,setavail] = useState([]);
    const [latency, setlatency] = useState([]);
    var avail_time = []
    var latency_time = []
    var avail_points=[]
    var latency_points=[]

    async function getdatapoints() {
        // declare the data fetching function
        
          try{
            // let res = await api.get(`/getdata/${urldata}`)
            let res = await api.get(`/getdata/${urldata}`);
           
            setavail(res.data[0])
            setlatency(res.data[1])
            console.log(avail)
            console.log(latency)
           
            
          }
            catch(err){
              console.log(err)
            }
        }

        function getavail(){
          let i=0
          avail.map((max)=> {
            avail_points[i]=max.Maximum
            avail_time[i] = max.Timestamp
            i=i+1
          })
          // console.log(` avail points = ${avail_points}`)
        }

        function getlatency(){
          let i=0
          latency.map((max)=> {
            latency_points[i]=max.Maximum
            latency_time[i] = max.Timestamp
            i=i+1
          })
          // console.log(` latency points = ${latency_points}`)

        }
    

      const card = (
        <React.Fragment>
         
          <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Enter URL To Insert
            </Typography>
    
            <Typography variant="h5" component="div">
            <TextField
              required
              id="filled-required"
              variant="filled"
              onChange={(event) => {seturldata(event.target.value)}}
            />
            </Typography>
            <CardActions>
          <Button variant="contained" onClick={getdatapoints}>Get Data</Button>
          </CardActions>
          </CardContent>
          
        </React.Fragment>
        );

        const avail_options = {
          
          title: {
            text: 'Availability Data Points of url'
        },
    
        subtitle: {
            text: urldata
        },
    
        yAxis: {
            title: {
                text: 'Availability '
            }
        },
    
        xAxis: {
          categories : avail_time
   
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
    
        series: [{
            name: 'Availability',
            data: avail_points
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
      }

        

      const latency_options = {
          
        title: {
          text: 'Latency Data Points of url'
      },
  
      subtitle: {
          text: urldata
      },
  
      yAxis: {
          title: {
              text: 'Latency'
          }
      },
  
      xAxis: {
        categories : latency_time
 
      },
  
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
  
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              }
          }
      },
  
      series: [{
          name: 'Latency',
          data: latency_points
      }],
  
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
    }

      return(
          <>
                <Box sx={{ minWidth: 270,  width: 400  }} >
                <Card variant="outlined" >{card}</Card>
                </Box>
                {getavail()}
                {getlatency()}
                <div>
                <HighchartsReact highcharts={Highcharts} options={avail_options} />
                <HighchartsReact highcharts={Highcharts} options={latency_options}/>
                </div>
          </>

      )
}