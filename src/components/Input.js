import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Dialog, DialogContent, Paper } from "@mui/material";

export default function Input() {
  const paperStyle = {
    padding: "50px,50px",
    width: 400,
    margin: "100px auto",
    height: 200,
  };

  const newStyle={
    padding: "50px,50px",
    width: 400,
    margin: "100px auto",
    height: 200,
  }
  const [numericId, setNumericId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const apiUrl =
      "http://localhost:8080/friend?numericId=" + numericId;
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        if (result?.name){
            setMessage("Your surprise friend is " + result?.name);
            setError(undefined);
        }
        else if(result?.errorMsg){
            setMessage(undefined);
            setError("Already Played or Invalid Id");
        }
        else if(result?.status){
            setMessage(undefined);
            setError("Please Insert a valid value");
        }
        setOpenDialog(true);
      } catch (error) {
        console.log(error);
    
      } finally {
    
      }
    };

    fetchData();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Paper elevation={2} style={paperStyle}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 4, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Numeric ID"
            variant="outlined"
            value={numericId}
            onChange={(e) => setNumericId(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Submit
        </Button>
 
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} style={newStyle}>
            <center>
          <DialogContent>
            {message !== undefined ? <p>{message}</p> : <p>{error}</p>}
          </DialogContent></center>
        </Dialog>
    </Container>
    
  );
}
