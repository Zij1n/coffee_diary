import { Button } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import BrewIns from "./BrewIns";
import Feedback from "./Feedback";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Brew() {
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);

  const { state } = useLocation();
  const { recipe } = state;
  console.log(recipe);
  return (
    <Box sx={{
        
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Stack spacing={2}>
        <Item>
          <BrewIns recipe={recipe} />
        </Item>
        <Item>
          <Button variant="contained" onClick={onClick}>
            Finish
          </Button>
        </Item>
        {showResults ? <Item> <Feedback recipe={recipe} /> </Item> : null}
      </Stack>
    </Box>
  );
}
