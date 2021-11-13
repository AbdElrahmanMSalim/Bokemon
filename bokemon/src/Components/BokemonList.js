import React, { useState, useEffect } from "react";
import {
  CardMedia,
  Grid,
  Card,
  CardContent,
  Box,
  CardActionArea,
  IconButton,
  Typography,
} from "@mui/material/";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import BackgroundImage from "../Assets/favicon-50.png"; // Import using relative path
import { makeStyles } from "../Helpers/Styles";
import DetailsDialog from "./DetailsDialog";
import capitalizeFirstLetter from "../Utils/CapitalizeFirstLetter";
import axios from "axios";
import { useGlobalState } from "@morefaie/react-useglobalstate";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 32,
    background: `url(${BackgroundImage}) top left no-repeat`,
    backgroundSize: "77px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "107% -14px",
    backgroundColor: "rgba(255, 255, 255,)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function CustomImageList({ bokemons }) {
  const classes = useStyles();
  const [favorites, setFavorites] = useGlobalState("bokemonsData.favorites");

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

  const handleAddToFavorites = (item) => {
    setFavorites((prev) => [...prev, item]);
  };

  const handleRemoveFromFavorites = (item) => {
    setFavorites((prev) => prev.filter((el) => el.id !== item.id));
  };

  return (
    <Grid container spacing={2}>
      {bokemons.map((item, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Card sx={{ minWidth: 275 }}>
            <CardActionArea onClick={() => handleOnDetailsClick(item)}>
              <CardMedia component="img" height="240" image={item.image} alt={item.name} />
            </CardActionArea>
            <CardContent
              className={classes.cardContent}
              style={{
                backgroundColor: item.color,
              }}
            >
              <Box>
                <Typography variant="h5" component="div" color="white">
                  {capitalizeFirstLetter(item.name)}
                </Typography>
                <Typography variant="subtitle1" component="div" color="white">
                  {capitalizeFirstLetter(item.type)}
                </Typography>
              </Box>

              {favorites.some((el) => el.id === item.id) ? (
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                  onClick={() => handleRemoveFromFavorites(item)}
                >
                  <StarIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                  onClick={() => handleAddToFavorites(item)}
                >
                  <StarBorderIcon />
                </IconButton>
              )}
            </CardContent>
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
