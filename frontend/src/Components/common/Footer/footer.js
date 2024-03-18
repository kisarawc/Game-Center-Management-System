import React from 'react';
import { AppBar, Box, Toolbar,Divider, Link, Typography, Grid} from '@mui/material';
import log from '../../../images/header/logo.jpeg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';



const Footer = () => {
  const logoStyle = {
    width: '150px',
    height: '150px',
    marginRight: 'auto',
  };

 
  return (
   <Grid sx={{top:'auto',bottom:0,}} >
    <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(to right, #3e0f80, #000000,#3e0f80)', boxShadow: '10'}}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <FacebookIcon sx={{fontSize:'3rem', ml:'200px'}}/>
          <Typography variant='h6' ml={'7px'} mr={'50px'}>
            <Link href="https://www.facebook.com/gglounge101" underline="hover"  sx={{ color: '#fff' }}>
              {'GG Lounge'}
            </Link>
          </Typography>

          <InstagramIcon sx={{fontSize:'3rem'}}/>
          <Typography variant='h6' ml={'5px'} mr={'40px'}>
            <Link href="https://www.instagram.com/accounts/login/" underline="hover"  sx={{ color: '#fff' }}>
              {'GG_Lounge'}
            </Link>
          </Typography>

          <img
            src={log}
            style={logoStyle}
            alt="logo of sitemark"
          />

          <WhatsAppIcon sx={{fontSize:'3rem', ml:'40px'}}/>
          <Typography variant='h6' ml={'5px'} mr={'50px'}>
           
              {'071 881 7008'}
           
          </Typography>

          <YouTubeIcon sx={{fontSize:'3rem', ml:'0px', mr:'5px'}}/>
          <Typography variant='h6' ml={'5px'}>
            <Link href="https://www.youtube.com/" underline="hover"  sx={{ color: '#fff' , mr:'150px'}}>
              {'GG_Lounge'}
            </Link>
          </Typography>
        </Box>
      </Toolbar>

      <Divider orientation="horizontal" flexItem sx={{ width: '100%', backgroundColor: 'white' }} />

      <Box sx={{ display: 'flex', mt: '5px', ml: '20px' }}>
      <Typography sx={{ color: 'white', mr: '400px' }}>Copyrights 2024</Typography>
      <Typography sx={{ color: 'white', textAlign: 'center'}}>165/A, New Kandy Rd, Welivita Junction, Malabe</Typography>
    </Box>

    </AppBar>
   
    </Grid>
  );
}

export default Footer;
