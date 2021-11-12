// React
import React, { useState, useRef, useEffect } from "react";

// Material

// Globals

// Helpers

// Components

// Factories

// Screens

// Assets

// Third Parties

// Styles

// Ad-Hoc Components

/**
 * @name useStateRef
 * @summary
 * @category
 * @component
 * @description
 * >
 */
const useStateRef = (initialState) => {
  const [stateVariable, setStateVariable] = useState({
    variable: initialState,
    callback: () => {},
  });
  const stateVariableRef = useRef(stateVariable);

  useEffect(() => {
    console.log(
      "%cuseStateRef %cState Changed - Trigger Callback",
      "font-weight: bold; color: gold;",
      "font-weight: bold; color: navy;",
      stateVariableRef.current
    );
    typeof stateVariableRef.current.callback === "function" && stateVariableRef.current.callback();
  }, [stateVariable]);

  return [
    { getState: () => stateVariableRef.current.variable },
    (value, callback) => {
      if (typeof value === "function") {
        setStateVariable((oldValue) => {
          const newValue = value(oldValue.variable);
          stateVariableRef.current = { variable: newValue, callback };
          console.log(
            "%cuseStateRef %cSet State (Function)",
            "font-weight: bold; color: gold;",
            "font-weight: bold; color: navy;",
            stateVariableRef.current
          );
          return { variable: newValue, callback };
        });
      } else {
        stateVariableRef.current = { variable: value, callback };
        setStateVariable(() => {
          console.log(
            "%cuseStateRef %cSet State (Value)",
            "font-weight: bold; color: gold;",
            "font-weight: bold; color: navy;",
            stateVariableRef.current
          );
          return { variable: value, callback };
        });
      }
    },
  ];
};

export default useStateRef;
