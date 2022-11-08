import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router";
import Steps from "./Steps";

const CREATE_URL="http://localhost:5000/record/add"

export default function Create() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // save to db @!
  }, [steps]);

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

    const newRecipe = { ...steps };
    console.log(newRecipe);
    await fetch(CREATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
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
          <Steps steps={steps} />

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
