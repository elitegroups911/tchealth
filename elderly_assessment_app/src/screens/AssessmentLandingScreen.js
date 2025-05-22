import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AssessmentLandingScreen = ({ navigation }) => {
  const handleNewAssessment = () => {
    navigation.navigate('NewAssessmentA1');
  };

  const handleViewAssessments = () => {
    navigation.navigate('ViewAssessment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>老年人能力评估</Text>
      <View style={styles.buttonContainer}>
        <Button title="新增评估" onPress={handleNewAssessment} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="查看评估" onPress={handleViewAssessments} />
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
    width: '80%',
  },
});

export default AssessmentLandingScreen;
