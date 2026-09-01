
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingScreen, CardScreen } from '../Screen/MainScreen'
import BottTabNavigation from '../Screen/MainScreen/BottomTabNavigator/BottomTabNavigator'

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
   
        <Stack.Navigator screenOptions={{headerShown:false}}>

            <Stack.Screen name='Main' component={BottTabNavigation} ></Stack.Screen>
             <Stack.Screen name='Card' component={CardScreen}></Stack.Screen>
             <Stack.Screen name='Setting' component={SettingScreen}></Stack.Screen>
             
            
        </Stack.Navigator>
   
  )
}

export default MainNavigation