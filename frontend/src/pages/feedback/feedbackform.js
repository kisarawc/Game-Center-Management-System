import React from 'react';
import { Grid, Typography, Input } from "@mui/material";

const feedbackform = props => {
    return (
        <Grid container sx={{

            marginBottom: '30px',
            display: 'block',
        }}



        >
            <Grid item xs={12}>
                <Typography component={'center'} sx={{ fontSize: '25px' }} >Feedback Form</Typography>
                <Grid />
                <Grid item xs={12} sm={6} sx={{ display: 'flex' }} >
                    <Typography
                        component={'label'}
                        htmlFor="id"
                        align='center'

                        sx={{
                            color: '#000000',
                            marginRight: '15px',
                            fontSize: '20px',
                            width: '200px',
                            display: 'block',
                            marginBottom: '15px',
                            padding: '20px',


                        }}
                    >
                        Game Name:

                    </Typography>

                    <Input
                        type="text"
                        id='Gamename'
                        name="Gamename"


                        sx={{ width: '400px' }}
                        value={''}
                        onChange={e => { }}
                    />


                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography
                    component={'label'}
                    htmlFor="id"
                    align='center'
                    sx={{
                        color: '#000000',
                        marginRight: '15px',
                        fontSize: '20px',
                        width: '200px',
                        display: 'block',
                        marginBottom: '15px',
                        padding: '20px',

                    }}
                >
                    Your review:

                </Typography>

                <Input
                    type="text Area"
                    id='review'
                    name="review"
                    sx={{ width: '400px' }}
                    value={''}
                    onChange={e => { }}
                />


            </Grid>



            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>

                <Typography

                    htmlFor="id"
                    align='center'
                    sx={{
                        color: '#000000',
                        marginRight: '15px',
                        fontSize: '20px',
                        width: '200px',
                        display: 'block',
                        marginBottom: '15px',
                        padding: '20px',

                    }}
                >
                    upload Pictures:

                </Typography>
                <Input
                    type="file"
                    id='picture'
                    name="picture"
                    sx={{ width: '400px' }}
                    value={''}
                    onChange={e => { }}
                />


            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography
                    component={'label'}
                    htmlFor="id"
                    align='center'
                    sx={{
                        color: '#000000',
                        marginRight: '15px',
                        fontSize: '20px',
                        width: '200px',
                        display: 'block',
                        marginBottom: '15px',
                        padding: '20px',


                    }}
                >
                    Name:

                </Typography>

                <Input
                    type="text"
                    id='name'
                    name="name"
                    sx={{ width: '400px' }}
                    value={''}
                    onChange={e => { }}
                />


            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography
                    component={'label'}
                    htmlFor="id"
                    align='center'
                    sx={{
                        color: '#000000',
                        marginRight: '15px',
                        fontSize: '20px',
                        width: '200px',
                        display: 'block',
                        marginBottom: '15px',
                        padding: '20px',

                    }}
                >
                    Email:

                </Typography>

                <Input
                    type="email"
                    id='email'
                    name="email"
                    sx={{ width: '400px' }}
                    value={''}
                    onChange={e => { }}
                />


            </Grid>
            <button
                sx={{
                    margin: 'auto',
                    marginRight: '200px',
                    marginBottom: '10px',
                    backgroundColor: '#00c6e6',
                    color: '#000000',
                    marginleft: '200px',
                    marginTop: '30px',


                    '&:hover': {
                        Opacity: '0.7',
                        backgroundColor: '#00c6e6',
                    }
                }}
            >
                Submit

            </button>

        </Grid>
    );
}

export default feedbackform;