import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../Context/AuthContext';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const RouterNavigation = () => {
  // 1. Context se token aur isLoading dono nikalo
  const { token, isLoading } = useContext(AuthContext);

  // 2. Agar AsyncStorage se token check ho raha hai, to Loader dikhao
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // 3. Agar token hai to Main (Home), nahi to Auth (Login/Signup)
  return token ? <MainNavigation /> : <AuthNavigation />;
};

const Router = () => {
  return (
    <NavigationContainer>
      <RouterNavigation />
    </NavigationContainer>
  );
};

export default Router;