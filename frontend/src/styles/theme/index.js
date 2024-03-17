import {createTheme} from "@mui/material";

export const Colors = {
    primary : "#a81cf4",
    secoundary: "#fa4bf4",
    success : "#18f96a",
    navbtn:"#8116ce",

    //solid
    black:"#000000",
    white:"#ffffff"

};

const theme = createTheme({
palette:{

    primary:{
        main: Colors.primary
    },
    secondary:{
        main: Colors.secoundary
    },
    navbtn:{
        main: Colors.navbtn
    },
}


});

export default theme;