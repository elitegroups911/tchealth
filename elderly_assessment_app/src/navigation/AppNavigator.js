import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import FunctionSelectionScreen from '../screens/FunctionSelectionScreen';
import AssessmentLandingScreen from '../screens/AssessmentLandingScreen';
import NewAssessmentScreenA1 from '../screens/NewAssessmentScreenA1';
import ViewAssessmentScreen from '../screens/ViewAssessmentScreen'; // Import new screen
import HomeVisitScreen from '../screens/HomeVisitScreen';
import CareServiceScreen from '../screens/CareServiceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FunctionSelection" component={FunctionSelectionScreen} />
        <Stack.Screen name="AssessmentLanding" component={AssessmentLandingScreen} />
        <Stack.Screen 
          name="NewAssessmentA1" 
          component={NewAssessmentScreenA1} 
          options={{ title: '新增评估 - A1 基本信息' }} 
        />
        <Stack.Screen 
          name="ViewAssessment" 
          component={ViewAssessmentScreen} 
          options={{ title: '查看评估' }} 
        />
        <Stack.Screen name="HomeVisit" component={HomeVisitScreen} />
        <Stack.Screen name="CareService" component={CareServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
