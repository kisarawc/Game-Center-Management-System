// Header.js

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const Header = () => {
  const styles = StyleSheet.create({
    header: {
      marginBottom: 20,
      borderBottom: '1px solid black',
      paddingBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.title}>GG LOUNGE</Text>
      <Text>Report generated: {new Date().toLocaleDateString()}</Text>
    </View>
  );
};

export default Header;
