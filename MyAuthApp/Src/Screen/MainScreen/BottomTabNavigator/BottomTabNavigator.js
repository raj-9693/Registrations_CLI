import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {HomeScreen, NoteScreen,AddNoteScreen} from '../../MainScreen'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Top Header chupane ke liye
        tabBarActiveTintColor: '#4F46E5', // Active Icon ka color
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="NoteAdd" component={AddNoteScreen} />
      <Tab.Screen name="Notes" component={NoteScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;