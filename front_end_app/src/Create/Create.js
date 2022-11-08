import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect,useRef } from "react";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router";
import Steps from "./Steps";
import Typography from '@mui/material/Typography'
const CREATE_URL = "http://149.28.232.23/create";

export default function Create() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const beanRef = useRef()
  const equipRef=useRef()
  const handleSubmit = (event) => {
    setError(false);
    setErrorMessage("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("description") && data.get("time")) {
      const step = {
        description: data.get("description"),
        time: data.get("time"),
      };
      setSteps((prev) => [...prev, step]);
    } else {
      setError(true);
      setErrorMessage("You should write something here");
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    // console.log("created clicked")

    const newTasks = steps;
    const tasks = JSON.stringify({ brewEquip: equipRef.current.value, bean:beanRef.current.value, tasks: newTasks });
    console.log(tasks)
    await fetch(CREATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: tasks,
    }).catch((error) => {
      window.alert(error);
      return;
    });
    navigate("/");
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>What kind of equipment and coffee been is needed for this recipe?</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              margin="normal"
              required
              // fullWidth
              multiline
              id="Brew Equipment"
              label="Brew Equipment"
              name="Brew Equipment"
              inputRef={equipRef}
              autoFocus
              sx={{ width: 1 / 2 }}
            />
            <TextField
              margin="normal"
              required
              // fullWidth
              multiline
              id="Bean"
              label="Bean"
              name="Bean"
              inputRef={beanRef}
              autoFocus
              sx={{ width: 1 / 2 }}
            />
          </Stack>
          <Steps steps={steps} />
          <Typography>Add brewing instructions by cliking "ADD STEP". Click "Create" when you finish</Typography>
          <Grid
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, alignItems: "center" }}
            wrap="nowrap"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              id="description"
              label="Description"
              name="description"
              error={error}
              helperText={errorMessage}
              autoFocus
              sx={{ width: 2 / 3 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="time"
              label="time (in sec)"
              id="time"
              sx={{ width: 1 / 3 }}
              error={error}
            />
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2, width: 1 / 2 }}
              >
                Add Step
              </Button>
              <Button
                onClick={handleCreate}
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 1 / 2 }}
              >
                Create Recipe
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
