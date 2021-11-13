// React
import React, { useEffect } from "react";
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
 * @name Subscribers
 * @summary
 * @category
 * @component
 * @description
 * >
 */
const Subscribers = ({ children }) => {
  // Theme & Style Hooks

  // Global State Hooks
  const [bokemonsData] = useGlobalState("bokemonsData.data");

  // State Hooks

  // Effect Hooks
  useEffect(() => {
    localStorage.setItem("bokemonsData", JSON.stringify(bokemonsData));
  }, [bokemonsData]);

  // Other Hooks

  // Event Handlers

  // Other

  // Component Render
  return children;
};

Subscribers.propTypes = {
  /**
   *
   */
};

Subscribers.defaultProps = {
  /**
   *
   */
};

export default Subscribers;
