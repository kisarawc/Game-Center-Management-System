import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import firebase from 'firebase/compat/app'; // Import the compat version for now
import 'firebase/compat/storage'; // Import the compat version for now

// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-9fTVA345Q3J9Mrym_me-Omi1mYBS1uw",
  authDomain: "offer-me-f2528.firebaseapp.com",
  projectId: "offer-me-f2528",
  storageBucket: "offer-me-f2528.appspot.com",
  messagingSenderId: "1065024084271",
  appId: "1:1065024084271:web:46c417382749633986e9da",
  measurementId: "G-XDMCBMMFXW"
};
firebase.initializeApp(firebaseConfig);

const CreateGameForm = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image_path: '', // Will hold the selected image file
    availability: false,
    platform: '',
    hourly_rate: 0,
    game_rating: 0
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      // If the change is from the file input, update the image_path with the file itself
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = firebase.storage(); // Initialize Firebase Storage
    if (image) {
      const imageRef = storage.ref().child(`gameImage/${image.name}`);
      
      // Upload the selected image to Firebase Storage
      imageRef.put(image)
        .then((snapshot) => {
            console.log("Image uploaded successfully");
            
          // Get the download URL for the uploaded image              
            return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
          try {
            formData.image_path = downloadURL
            const formDataToSend = new FormData();
            // Append all form data to formDataToSend
            for (const key in formData) {
              formDataToSend.append(key, formData[key]);
            }
            axios.post('http://localhost:5000/api/games/createGame', formData).then(()=>{
              alert('Game created successfully!');
              // You can add more logic here, like redirecting to a different page
            });
           
          } catch (error) {
            console.error('Error creating game:', error);
            alert('Error creating game. Please try again.');
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <input
        accept="image/*" // Allow only image files
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        name="image_path"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label htmlFor="image-upload">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.availability}
            onChange={handleCheckboxChange}
            name="availability"
          />
        }
        label="Availability"
      />
      <TextField
        label="Platform"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Hourly Rate"
        name="hourly_rate"
        value={formData.hourly_rate}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Game Rating"
        name="game_rating"
        value={formData.game_rating}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Create Game
      </Button>
    </form>
  );
};

export default CreateGameForm;