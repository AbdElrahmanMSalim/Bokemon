import React, { useState } from "react";
import { CardMedia, Grid, Card, CardContent, Typography, CardActionArea } from "@mui/material/";
import BackgroundImage from "../Assets/favicon-50.png"; // Import using relative path
import { makeStyles } from "../Helpers/Styles";

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CustomImageList({ bokemons }) {
  const classes = useStyles();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({});

  const handleOnDetailsClick = (item) => {
    setOpenDetailsDialog(true);
    setCurrentPokemon(item);
  };

  console.log("bokemons", bokemons);

  return (
    <Grid container spacing={2}>
      {bokemons.map((item, i) => (
        <Grid item xs={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardActionArea onClick={(item) => handleOnDetailsClick(item)}>
              <CardMedia component="img" height="240" image={item.image} alt={item.name} />
              <CardContent
                className={classes.cardContent}
                style={{
                  backgroundColor:
                    i % 6 === 0
                      ? "#4FC1A5"
                      : i % 6 === 4
                      ? "#F7786B"
                      : i % 6 === 3
                      ? "#58AAF6"
                      : i % 6 === 2
                      ? "#FFCE4B"
                      : i % 6 === 1
                      ? "#7C538C"
                      : "#B1736C",
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
    </Grid>
  );
}
