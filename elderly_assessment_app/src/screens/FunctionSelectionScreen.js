import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const FunctionSelectionScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>功能选择</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="老年人能力评估 (GB/T42195-2022)" 
          onPress={() => navigation.navigate('AssessmentLanding')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="居家上门服务" 
          onPress={() => navigation.navigate('HomeVisit')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="照顾服务" 
          onPress={() => navigation.navigate('CareService')} 
        />
      </View>
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
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%', // Adjust width as needed
  }
});

export default FunctionSelectionScreen;
