// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Material

// Globals

// Helpers
import { useGlobalState } from "@morefaie/react-useglobalstate";

// Components

// Factories

// Screens

// Assets

// Third Parties

// Services

// Styles

// Ad-Hoc Components

/**
 * @name Initializer
 * @summary
 * @category
 * @component
 * @description
 * >
 */
const Initializer = ({ children }) => {
  // Theme & Style Hooks

  // Global State Hooks
  const [bokemonsData, setBokemonsData] = useGlobalState("bokemonsData.data");
  const [favorites, setFavorites] = useGlobalState("bokemonsData.favorites");

  // State Hooks
  const [loaded, setLoaded] = useState(false);

  // Effect Hooks
  useEffect(() => {
    try {
      let data, fav;
      data = JSON.parse(localStorage.getItem("bokemonsData")) || {};
      fav = JSON.parse(localStorage.getItem("favorites")) || {};
      if (data.length === 150) setBokemonsData(data);
      if (fav.length) setFavorites(fav);
      setLoaded(true);
    } catch (e) {
      console.log("e", e);
    }
  }, []);

  // Other Hooks

  // Event Handlers

  // Other

  // Component Render
  return loaded && children;
};

Initializer.propTypes = {
  /**
   *
   */
};

Initializer.defaultProps = {
  /**
   *
   */
};

export default Initializer;
