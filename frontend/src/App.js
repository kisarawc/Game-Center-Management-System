import React from "react";
import MyRouter from "./router/routes";
import { Container } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>

            {/* <Container maxWidth="xl"> */}
              <MyRouter />
            {/* </Container> */}
            
      </>
  );
}

export default App;
