import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';                                                        // Dialog Component from Meterial UI
import DialogActions from '@mui/material/DialogActions';                                          // DialogActions Component from Meterial UI
import DialogContent from '@mui/material/DialogContent';                                          // DialogContent Component from Meterial UI
import DialogContentText from '@mui/material/DialogContentText';                                  // DialogContentText Component from Meterial UI
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

const baseURL = 'https://h8zh52qsb0.execute-api.us-west-1.amazonaws.com/prod'
const api = axios.create({
  baseURL: 'https://h8zh52qsb0.execute-api.us-west-1.amazonaws.com/prod'
})
export const GetData = () => {

  const [urldata, seturldata] = useState([]);               // for setiing response from getURL
  const [response, setresponse] = useState([]);            // for setting response from addURL
  const [print, setprint] = useState();
  const [oldurls, setoldurl] = useState([])
  const [updateurls, setupdateurl] = useState([])
  const [deleteurl, setdeleteurl] = useState("")
  const [openUpdate, setOpenUpdate] = useState(false);
  let row = []

  useEffect(() => {
    // declare the data fetching function
    const getURL = async () => {
      try {
        let res = await api.get('/')
        // let res = await axios.get("http://localhost:3001/");
        seturldata(res.data)
        setresponse(true)

      }
      catch (err) {
        console.log(err)
      }
    }

    // call the function
    getURL()
      // make sure to catch any error
      .catch(console.error);
  }, [response])


  const handleUpdate = async () => {                                                               // Function to update an url
    console.log(oldurls)
    console.log(updateurls)
    try {

      let res = await api.put("/",
        { url: oldurls, updateurl: updateurls });

      setresponse(res.data[0].url)
      setprint(true)
      setTimeout(function () {
        setprint(false)
      }, 3000);
      console.log(res.data[0].url)
    }
    catch (err) {
      console.log(err)
    }

  }

  const handleUpdateOpen = () => {                                                                 // Function to open update url Dialog
    setOpenUpdate(true);                                                                           // Set setOpenUpdate to True
  };
  const handleUpdateClose = () => {                                                                // Function to close update url Dialog
    setOpenUpdate(false);                                                                          // Set setOpenUpdate to false
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },

    {
      field: 'url',
      headerName: 'URLs',
      width: 200,
      editable: true,
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {

        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          try {
            // let res = await api.put('/',{url:oldurls,updateurl:updateurls})
            console.log(deleteurl)
            let res = await axios.delete(`${baseURL}/${thisRow.url}`);

            setresponse(res.data)
            setprint(true)

          }
          catch (err) {
            console.log(err)
            setprint(true)
          }
          setTimeout(function () {
            setprint(false)
          }, 3000);
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
    {
      field: 'Edit',                                                                                // Field Name
      headerName: '',                                                                               // Field Header Text
      width: 100,                                                                                   // Field Width
      disableClickEventBubbling: true,                                                              // Disable Event Bubbling on clicking his column
      disableColumnMenu: true,                                                                      // Disable Column Menu
      disableReorder: true,                                                                         // Disable Column sorting 
      hideSortIcons: true,                                                                          // Hide Icons for sorting
      renderCell: (params) => {                                                                    // Set Rendering for this column

        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          setoldurl(thisRow.url)
          console.log(oldurls)
          setOpenUpdate(true)
        };
        return <Button onClick={onClick} variant="contained" color="primary">Edit</Button>;       // Display button as rows for this column
      }
    },
  ];



  function getrows() {
    let i = 0
    // console.log(`url data = ${urldata[0].url}`)
    urldata.map((urls) => {

      row[i] = { id: urls._id, url: urls.url };
      i += 1
    })


  }


  async function getURL() {
    try {
      let res = await api.get("/")
      // let res = await axios.get("http://localhost:3001/");
      seturldata(res.data)

    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>

      {getrows()}
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Button variant="contained" onClick={getURL}>Get Urls</Button>
      {print ? <Alert severity="success">{response}</Alert> : null}

      <Dialog open={openUpdate} onClose={handleUpdateClose} data-testid="EditDialog">
        <DialogTitle>Edit URL</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a URL. Press Submit to Update URL.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="urlToUpdate"
            id="newUrl"
            label="newUrl"
            type="url"
            onChange={e => setupdateurl(e.target.value)}

            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} data-testid="EditClose">Cancel</Button>
          <Button onClick={handleUpdate} data-testid="EditSubmit">Submit</Button>
        </DialogActions>
      </Dialog>

    </>
  )


}