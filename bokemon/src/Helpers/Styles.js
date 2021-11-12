// import React from "react";
import { makeStyles as materialMakeStyles } from "@mui/styles";

/**
 *
 * @param {function} func
 * @returns {function}
 */
export function makeStyles(func) {
  return materialMakeStyles(
    (theme) => {
      let stylesObject = func(theme);
      let nestedStyles = {};
      (function recursive(obj) {
        for (let key in obj) {
          let value = obj[key];
          if (value && typeof value === "object") {
            if (key.startsWith("& $")) nestedStyles[key.slice(3)] = {};
            recursive(value);
          }
        }
      })(stylesObject);
      return { ...stylesObject, ...nestedStyles };
    },
    { index: 1 }
  );
}
