import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CareServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>照顾服务</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CareServiceScreen;
