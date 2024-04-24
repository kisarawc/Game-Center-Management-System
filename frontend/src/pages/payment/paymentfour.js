import React, { useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box , Button, Card, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';



const PaymentFour = () => {
  const [formData,setFormData] = useState({
    card_no:'', 
    name:'', 
    cvv:'' , 
    expire_date:'', 
    card_type:''
  })

  const {card_no, name, cvv , expire_date, card_type} =formData

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const CardSave = async(e)=>{
  e.preventDefault()

  try{
    console.log(formData)

    const data = await axios.post(`http://localhost:3000/api/card-payments`, formData)

}catch(error){
    console.log(error.message);

}
}

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <br />
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Card Details
            </Typography>
            <form onSubmit={CardSave}>
            <TextField id="card_no" label="Card No" variant="outlined" margin="normal" fullWidth type='text' name='card_no' value={card_no} onChange={handleInputChange} />
            <TextField id="name" label="Name" variant="outlined" margin="normal" fullWidth type='text' name='name' value={name} onChange={handleInputChange}/>
            <TextField id="cvv" label="CVV" variant="outlined" margin="normal" fullWidth type='text' name='cvv' value={cvv} onChange={handleInputChange}/>
            <TextField id="expire_date" label="Expire Date" variant="outlined" margin="normal" fullWidth type='date' name='expire_date' value={expire_date} onChange={handleInputChange}/> 
            <Typography color="error">Your error message here</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button variant="contained" color="primary" type='submit' >
                Confirm Details
              </Button>
              <Button variant="contained" color="secondary">
                Pay 
              </Button>
            </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}

export default PaymentFour;
