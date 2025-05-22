import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeVisitScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>居家上门服务</Text>
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

export default HomeVisitScreen;
