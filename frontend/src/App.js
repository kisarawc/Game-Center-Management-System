import React from "react";
import MyRouter from "./router/routes";
import { Container } from "@mui/material";
import { ToastContainer} from 'react-toastify';
import axios from "axios"
axios.defaults.withCredentials = true;




function App() {
  return (
      <>
            <Container maxWidth="xl">
      <ToastContainer/>

              <MyRouter />
            </Container>
      </>
  );
}

export default App;
