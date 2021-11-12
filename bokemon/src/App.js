import React from "react";
import Main from "./Screens/Main";
import Providers from "./Factories/Providers";
import BackgroundImage from "./Assets/favicon-50.png"; // Import using relative path
import { Box } from "@mui/material";

function App(props) {
  return (
    <Providers>
      <Box
        style={{
          background: `url(${BackgroundImage}) no-repeat`,
          backgroundPosition: "122% -3%",
          backgroundColor: "snow",
          backgroundSize: "contain",
          height: "100vh",
        }}
      >
        <Main />
      </Box>
    </Providers>
  );
}

export default App;
