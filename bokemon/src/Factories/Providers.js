// React
import React from "react";
import PropTypes from "prop-types";

// Material

// Globals

// Helpers

// Components

// Factories

// Screens

// Assets

// Third Parties
import { SnackbarProvider } from "notistack";

// Styles

// Ad-Hoc Components

// Other

/**
 * @name Providers
 * @summary App Context Providers
 * @category Factories
 * @component
 * @description
 * > App Context Providers that inject:<br />
 * > Styles<br />
 * > Theme<br />
 * > Language
 */
function Providers(props) {
  // Theme & Style Hooks

  // Global State Hooks

  // State Hooks

  // Effect Hooks

  // Other Hooks

  // Event Handlers

  // Other

  // Component Render
  return <SnackbarProvider maxSnack={5}>{props.children}</SnackbarProvider>;
}

Providers.propTypes = {
  /**
   * Application main component
   */
  children: PropTypes.node,
};

export default Providers;
