import React, { useState, useEffect } from "react";

import { Typography, Box, TextField, Backdrop, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import BokemonList from "../Components/BokemonList";
import { useGetAllBokemons, useGetBokemonDetails } from "../Services";
import { useSnackbar } from "notistack";

import axios from "axios";

function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bokemons, setBokemons] = useState({});
  const [bokemonsPromises, setBokemonsPromises] = useState([]);
  const [bokemonsData, setBokemonsData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const getAllBokemons = useGetAllBokemons();

  useEffect(() => {
    getAllBokemons()
      .then((bokemons) => {
        setBokemons(bokemons);
        const data = [];
        bokemons.results.map((bokemon) => {
          data.push(axios.get(bokemon.url));
        });
        setBokemonsPromises(data);
      })
      .catch((errors) => {
        console.log("errors", errors);
        errors.forEach((e) => {
          enqueueSnackbar(e, {
            variant: "error",
            autoHideDuration: 3000,
          });
        });
      });
  }, []);

  useEffect(() => {
    axios
      .all(bokemonsPromises)
      .then((responses) => {
        setBokemonsData((prev) =>
          responses.map((response, i) => {
            const { data } = response;
            return {
              name: data.name,
              id: data.id,
              image: data.sprites["front_default"],
              type: data.types.map((type) => type.type.name).join(", "),
              ability: data.abilities.map((ability) => ability.ability.name).join(","),
              species: data.species,
              height: data.height,
              weight: data.weight,
              abilities: data.abilities,
              stats: data.stats,
              color:
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
              moves: data.moves
                .map((move) => move.move.name)
                .slice(0, 10)
                .join(", "),
            };
          })
        );
        // use/access the results
      })
      .catch((errors) => {});
  }, [bokemonsPromises]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" padding="54px">
      <Typography variant="h3" component="div" style={{ margin: 66, fontSize: "2.5rem" }}>
        What pokemon are you looking for?
      </Typography>
      <Box style={{ display: "flex", alignItems: "flex-end", padding: "24px", width: "100%" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Search"
          variant="standard"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: "100%" }}
        />
      </Box>
      {bokemonsData.length ? <BokemonList bokemons={bokemonsData} /> : null}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!bokemonsData.length}
        // onClick={}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default Main;
