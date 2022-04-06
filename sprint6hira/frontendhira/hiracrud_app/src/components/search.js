import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as d3 from 'd3';
import './hirarchy.css'

const baseURL = 'https://h8zh52qsb0.execute-api.us-west-1.amazonaws.com/prod'

const api = axios.create({
  baseURL: 'https://h8zh52qsb0.execute-api.us-west-1.amazonaws.com/prod'
})

export const Search_mongodb = () => {

  const [data, seturldata] = useState([]);
  const [searchurl, setsearchurl] = useState("")
  const [searchdata, setsearchdata] = useState([])
  const [print, setprint] = useState();
  const row = []


  async function searchURL() {
    try {
      // let res = await api.get('/')
      console.log("connecting")
      let res = await api.get(`/search/${searchurl}`);
      // setsearchdata(res.data.suburls)
      seturldata(res.data)
      if (res.data.name == null) {
        setprint(false)

      }
      else {
        setprint(true)

      }

      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }

  // d3 hierarchy Code
  function get_tree() {

    d3.select('#subUrlChart').selectAll("*").remove();
    // set the dimensions and margins of the diagram
    const margin = { top: 150, right: 150, bottom: 30, left: 150 },
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([height, width - 400]);
    treemap.nodeSize([25, 200])
    let nodes = d3.hierarchy(data, function (d) {
      return d.children;
    });

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    let canvas = d3.select('#subUrlChart').append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    const g = canvas.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    const link = g.selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .style("stroke", function (d) { return d.data.level; })
      .attr("d", function (d) {
        return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
      });

    // adds each node as a group
    const node = g.selectAll(".node")
      .data(nodes.descendants())
      .enter()
      .append("g")
      .attr("class", function (d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });


    node.append("text")
      .attr("dy", ".35em")
      .attr("x", function (d) {
        return d.children ?
          (d.data.value + 4) * -1 : d.data.value + 4
      })
      .style("text-anchor", function (d) {
        return d.children ? "end" : "start";
      })
      .text(function (d) { return d.data.name; });
  }



  const cardsearch = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Enter URL to Search
        </Typography>

        <Typography variant="h5" component="div">
          <TextField
            required
            id="filled-required"
            variant="filled"
            onChange={(event) => { setsearchurl(event.target.value) }}
          />
        </Typography>

      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={searchURL}>Search</Button>
      </CardActions>
    </React.Fragment>
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },

    {
      field: 'url',
      headerName: 'URLs',
      width: 400,
      editable: true,
    },

  ];

  function getrows() {
    let i = 0
    // console.log(`url data = ${urldata[0].url}`)
    if (searchdata != null) {
      searchdata.map((urls) => {

        row[i] = { id: i, url: urls };
        i += 1
      })
    }
  }

  return (
    <>

      <Box sx={{ minWidth: 275, width: 300, }}>
        <Card variant="outlined" >{cardsearch}</Card>
      </Box>

      <Button variant="contained" onClick={get_tree()}>display hierarchy</Button>

      <div id="subUrlChart">
      </div>

      {get_tree()}

      {/* <div style={{ height: 300, width: '700px' }}>
      { print? 
        <DataGrid
        
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        />
             :<p>URL DOES NOT EXISTS</p>
  
        }
      </div> */}

    </>
  )
}