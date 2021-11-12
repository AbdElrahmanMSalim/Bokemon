// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Material
import { Box, FormHelperText, FormControl } from "@mui/material/";

// Globals

// Helpers
import { makeStyles } from "../Helpers/Styles";
import useStateRef from "../Helpers/useStateRef";

// Components

// Factories

// Screens

// Assets

// Help

// Third Parties
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  helperTextWrapper: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    flex: 1,
  },
}));

// Ad-Hoc Components

/**
 * @name MapField
 * @summary
 * @category
 * @component
 * @description
 * >
 */
const MapField = ({
  className,
  style,
  tooltip,
  helpKey,
  helpIconProps,
  variant,
  margin,
  autoComplete,
  inputProps,
  size,
  helperText,
  maxCharacters,
  defaultValue,
  showFirstError: onlyShowFirstError,
  value,
  type,
  onChange,
  id,
  isLoading,
  isSubmitting,
  hidden,
  name,
  label,
  disabled,
  errors,
  preHelperComponents,
  postHelperComponents,
  fullWidth,
  google,
  ...otherProps
}) => {
  value = value === undefined || value === null ? {} : value;

  // Theme & Style Hooks
  const classes = useStyles();

  // Global State Hooks

  // State Hooks
  const [location, setLocation] = useStateRef(value);
  const [autoCompleteLocation, setAutoCompleteLocation] = useStateRef({});

  //Effect Hooks
  useEffect(() => {
    if (value.lng) setLocation(value);
    else if (!value.lng && !isLoading)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            let location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(location);
            typeof onChange === "function" && onChange(name, location);
          },
          function (error) {
            console.log("error", error);
            setLocation(undefined);
            typeof onChange === "function" && onChange(name, undefined);
            if (error.code == error.PERMISSION_DENIED)
              console.log(
                "Please enable location services to be able to add a branch location on the map."
              );
            // alert("Please enable location services to be able to add a branch location on the map.");
          }
        );
      } else {
        alert("Error loading current location, please refresh the page");
        setLocation(undefined);
      }
  }, [value.lng, isLoading]);

  useEffect(() => {
    console.log(
      `%cText Field %cMount -> %cName: %c${name}`,
      "font-weight: bold; color: blue",
      "",
      "font-weight: bold;",
      ""
    );
  }, []);

  // Other Hooks

  // Event Handlers
  const displayMarkers = () => {
    return (
      <Marker
        key={location.getState().lat}
        position={{
          lat: location.getState().lat,
          lng: location.getState().lng,
        }}
      />
    );
  };

  const onChangeHandler = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    setLocation({ lat, lng });
    typeof clickEvent.persist === "function" && clickEvent.persist();
    typeof onChange === "function" && onChange(name, { lat, lng });
  };

  const handleOnGetLatLng = (location) => {
    setAutoCompleteLocation({ ...location });
    typeof onChange === "function" && onChange(name, location);
  };

  // Other
  console.log(
    `%cMap Field %cRerender -> %cName: %c${name} %cCurrentValue: %c${value}`,
    "font-weight: bold; color: blue",
    "",
    "font-weight: bold;",
    "",
    "font-weight: bold;",
    ""
  );

  console.log(111, google);

  // Component Render
  return (
    <Box className={className} style={{ display: hidden ? "none" : "block" }}>
      <Map google={google} zoom={14}></Map>

      {/* {
            
            location.getState() && location.getState().lat && (
              <Map
                centerAroundCurrentLocation
                google={google}
                zoom={8}
                streetViewControl={false}
                center={autoCompleteLocation.getState()}
                initialCenter={location.getState()}
                style={{
                  position: "relative",
                  height: "50vh",
                  width: "100%",
                }}
                containerStyle={{
                  position: "relative",
                }}
                onClick={onChangeHandler}
              >
                {location.getState() && displayMarkers()}
              </Map>
            )
          <Map
            centerAroundCurrentLocation
            google={google}
            zoom={8}
            streetViewControl={false}
            center={autoCompleteLocation.getState()}
            initialCenter={
              location.getState() && location.getState().lat
                ? location.getState()
                : { lat: 25.340436793754563, lng: 55.41430255398154 }
            }
            style={{
              position: "relative",
              height: "50vh",
              width: "100%",
            }}
            containerStyle={{
              position: "relative",
            }}
            onClick={onChangeHandler}
          />
        } */}
    </Box>
  );
};

MapField.propTypes = {
  /**
   *
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  //   validator: PropTypes.func,
  autoFocus: PropTypes.bool,
  tooltip: PropTypes.string,
  helpKey: PropTypes.string,
  maxCharacters: PropTypes.number,
};

MapField.defaultProps = {
  variant: "outlined",
  margin: "normal",
  //   autoComplete: "off",
  showFirstError: true,
  isLoading: false,
  autoFocus: false,
  onChange: () => {},
  fullWidth: true,
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDcK0HDEzvbudEGlPAIA5NLGUd54J-2wDs",
})(MapField);
