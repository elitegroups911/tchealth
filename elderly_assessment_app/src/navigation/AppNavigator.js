import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import FunctionSelectionScreen from '../screens/FunctionSelectionScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import HomeVisitScreen from '../screens/HomeVisitScreen';
import CareServiceScreen from '../screens/CareServiceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FunctionSelection" component={FunctionSelectionScreen} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
        <Stack.Screen name="HomeVisit" component={HomeVisitScreen} />
        <Stack.Screen name="CareService" component={CareServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
