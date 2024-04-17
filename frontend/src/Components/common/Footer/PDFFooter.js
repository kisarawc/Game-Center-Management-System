import React from 'react';
import { Text, View } from '@react-pdf/renderer';

const styles = {
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#555',
  },
};

const PDFFooter = () => {
  return (
    <View style={styles.footer}>
      <Text>GG LOUNGE</Text>
      <Text>165/A, New Kandy Rd, Welivita Junction, Malabe</Text>
    </View>
  );
};

export default PDFFooter;
