import React from "react";
import MyRouter from "./router/routes";
import { Container } from "@mui/material";


function App() {
  return (
      <>
            <Container maxWidth="xl">
              <MyRouter />
            </Container>
      </>
  );
}

export default App;
