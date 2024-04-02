import {Grid, Typography } from "@mui/material";

const bookingForm = props =>{
    return(
        <Grid
             container           
            sx={{
               
                backgroundColor:'#333A73',
                opacity:'0.7',
                width:'800px',
                mt:'20px',
                mb:'10px',
                height:'1000px',
                borderRadius:'20px'
            }}
        >
            <Grid display={"flex"}>
              {/* <Typography variant="h3"> Select the game you want</Typography> */}
               
            </Grid>
        </Grid>
        
    );
}

export default bookingForm;