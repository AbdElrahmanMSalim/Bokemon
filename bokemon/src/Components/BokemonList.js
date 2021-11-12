import React, { useState, useEffect } from "react";
import { CardMedia, Grid, Card, CardContent, Typography, CardActionArea } from "@mui/material/";
import BackgroundImage from "../Assets/favicon-50.png"; // Import using relative path
import { makeStyles } from "../Helpers/Styles";
import DetailsDialog from "./DetailsDialog";
import capitalizeFirstLetter from "../Utils/CapitalizeFirstLetter";
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

export default function CustomImageList({ bokemons }) {
  const classes = useStyles();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({});

  const [genders, setGenders] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/gender/1`).then((g) => {
      setGenders((prev) => [
        ...prev,
        ...g.data.pokemon_species_details.map((el) => ({
          name: el.pokemon_species.name,
          gender: "Female",
        })),
      ]);
    });
    axios.get(`https://pokeapi.co/api/v2/gender/2`).then((g) => {
      setGenders((prev) => [
        ...prev,
        ...g.data.pokemon_species_details.map((el) => ({
          name: el.pokemon_species.name,
          gender: "Male",
        })),
      ]);
    });
    axios.get(`https://pokeapi.co/api/v2/gender/3`).then((g) => {
      setGenders((prev) => [
        ...prev,
        ...g.data.pokemon_species_details.map((el) => ({
          name: el.pokemon_species.name,
          gender: "Genderless",
        })),
      ]);
    });
    return () => {
      setGenders([]);
    };
  }, []);

  const handleOnDetailsClick = (item) => {
    setCurrentPokemon(item);
    setOpenDetailsDialog(true);
  };

  return (
    <Grid container spacing={2}>
      {bokemons.map((item, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Card sx={{ minWidth: 275 }}>
            <CardActionArea onClick={() => handleOnDetailsClick(item)}>
              <CardMedia component="img" height="240" image={item.image} alt={item.name} />
              <CardContent
                className={classes.cardContent}
                style={{
                  backgroundColor: item.color,
                }}
              >
                <Typography variant="h5" component="div" color="white">
                  {capitalizeFirstLetter(item.name)}
                </Typography>
                <Typography variant="subtitle1" component="div" color="white">
                  {capitalizeFirstLetter(item.type)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      {currentPokemon.name && (
        <DetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          currentPokemon={currentPokemon}
          genders={genders}
        />
      )}
    </Grid>
  );
}
