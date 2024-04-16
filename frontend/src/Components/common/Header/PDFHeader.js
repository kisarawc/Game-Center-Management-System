import React from 'react';
import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const logoImage = require('../../../images/header/logo.jpeg'); // Update path to your logo image

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    borderBottom: '1px solid black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    color: '#ffffff',
    height: 70
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 70,
    color: '#ffffff',


  },
  body: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop:45,
    marginRight: 10,
    color: '#ffffff',
  },
  logo: {
    marginLeft: 10,
    width: 50,
    height: 50,

  },
});


const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Image src={logoImage} style={styles.logo} />
        <Text style={styles.title}>GG LOUNGE GAME CENTER</Text>
      </View>
      <Text style={styles.body}>Report generated: {new Date().toLocaleDateString()}</Text>
    </View>
  );
};

export default Header;
