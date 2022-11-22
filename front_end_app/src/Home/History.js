import React from "react";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Steps from "../Create/Steps";
import { useNavigate } from "react-router";

const RECORD_URL = "/records";

export default function History() {
  const navigate = useNavigate();

  const [records, setrecords] = useState([]);

  const loadRecord = () => {
    fetch(RECORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setrecords(data))
      .catch((err) => console.log(err));
  };
  useEffect(loadRecord, []);
  console.log("records:", records);

  return records.map((record, i) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{record.time}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* @! todo: encapusulate the following accordion to a componenet */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {record.recipe.brewEquip} {record.recipe.bean}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Steps steps={record.recipe.tasks.tasks} />
              <Button
                variant="contained"
                onClick={() =>
                  navigate("/Brew", { state: { recipe: record.recipe } })
                }
              >
                Brew Again
              </Button>
            </AccordionDetails>
          </Accordion>
          <Typography>How was the coffee: {record.feedback}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });
}
