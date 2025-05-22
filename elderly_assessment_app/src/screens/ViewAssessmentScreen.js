import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewAssessmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>查看评估</Text>
      <Text style={styles.placeholder}>Assessment viewing functionality will be implemented here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});

export default ViewAssessmentScreen;
