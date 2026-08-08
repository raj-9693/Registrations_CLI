
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../Screen/MainScreen'

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
   
        <Stack.Navigator>

            <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>

        </Stack.Navigator>
   
  )
}

export default MainNavigation