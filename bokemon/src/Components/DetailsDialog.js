import React, { useEffect, useState } from "react";
import {
  Button,
  CardMedia,
  Dialog,
  Card,
  CardContent,
  Typography,
  DialogContent,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  DialogTitle,
  Paper,
  DialogActions,
  Divider,
  Box,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Draggable from "react-draggable";
import { makeStyles } from "../Helpers/Styles";
import { Radar } from "react-chartjs-2";

import capitalizeFirstLetter from "../Utils/CapitalizeFirstLetter";
import BackgroundImage from "../Assets/favicon-50.png"; // Import using relative path

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 32,
    background: `url(${BackgroundImage}) top left no-repeat`,
    backgroundSize: "77px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "107% -14px",
    backgroundColor: "rgba(255, 255, 255,)",
  },
}));

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DetailsDialog({ currentPokemon, open, setOpen, genders }) {
  const classes = useStyles();

  const [gender, setGender] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const found = genders.find((gender) => gender.name === currentPokemon.name);
      setGender(found);
    }
    return () => {
      setExpanded(false);
      setGender({});
      setEvolutionChain({});
    };
  }, [open]);

  //   useEffect(() => {
  //     if (open) {
  //       axios.get(currentPokemon.species.url).then((response) => {
  //         axios.get(response.data.evolution_chain.url).then((evolution) => {
  //           setEvolutionChain(evolution.data);
  //         });
  //       });
  //     }
  //   }, [open]);

  //   console.log("evolutionChain", evolutionChain);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log("currentPokemon", currentPokemon);

  const data = {
    labels: currentPokemon.stats.map((el) => capitalizeFirstLetter(el.stat.name)),
    datasets: [
      {
        label: currentPokemon.name,
        data: currentPokemon.stats.map((el) => el.base_stat),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography variant="h4" component="div" style={{ color: currentPokemon.color }}>
            {currentPokemon.id}
            {". "}
            {capitalizeFirstLetter(currentPokemon.name)}
          </Typography>
          <Divider style={{ margin: "24px 0px" }} />
        </DialogTitle>
        <DialogContent>
          <Card sx={{ minWidth: 275 }}>
            <CardMedia
              component="img"
              height="240"
              image={currentPokemon.image}
              alt={currentPokemon.name}
            />
            <CardContent
              className={classes.cardContent}
              style={{ backgroundColor: currentPokemon.color }}
            >
              <Typography variant="h5" component="div" color="white">
                {capitalizeFirstLetter(currentPokemon.name)}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                color="white"
                style={{ marginBottom: 12 }}
              >
                {capitalizeFirstLetter(currentPokemon.type)}
              </Typography>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                style={{ backgroundColor: "inherit", color: "white", padding: 4 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography variant="subtitle1" component="div" color="white">
                    Pokemon Information
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {gender.name && (
                    <Typography variant="subtitle1" component="div" color="white">
                      Gender: {capitalizeFirstLetter(gender.gender)}
                    </Typography>
                  )}
                  <Typography variant="subtitle1" component="div" color="white">
                    Height: {currentPokemon.height} decimetres
                  </Typography>
                  <Typography variant="subtitle1" component="div" color="white">
                    Weight: {currentPokemon.weight} hectograms
                  </Typography>
                  <Typography variant="subtitle1" component="div" color="white">
                    Species: {capitalizeFirstLetter(currentPokemon.species.name)}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                style={{ backgroundColor: "inherit", color: "white", padding: 4 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography variant="subtitle1" component="div" color="white">
                    Pokemon Abilities
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {currentPokemon.abilities.map(({ ability }) => (
                    <Typography variant="subtitle1" component="div" color="white">
                      {capitalizeFirstLetter(ability.name)}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                style={{ backgroundColor: "inherit", color: "white", padding: 4 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography variant="subtitle1" component="div" color="white">
                    Pokemon Stats
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Radar data={data} />
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
          {/* <DialogContentText>Details:</DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
