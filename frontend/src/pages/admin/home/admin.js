import React from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../../Components/common/adminHeader';
import { Button, Container, Grid } from '@mui/material';

const Admin = () => {
  return (
    <div>
      <AdminHeader />
      <Container sx={{mt:'20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              
              component={Link}
              to="/admin/games"
            >
              Games
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              
              component={Link}
              to="/admin/events"
            >
              Events
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              
              component={Link}
              to="/bookingAdmin"
            >
              Bookings
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              
              component={Link}
              to="/admin/reviews"
            >
              Reviews
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              
              component={Link}
              to="/admin/accounts"
            >
              Accounts
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Admin;
