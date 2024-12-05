import React from "react";
import MyRouter from "./router/routes";
import { Container } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
axios.defaults.withCredentials = true;

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
