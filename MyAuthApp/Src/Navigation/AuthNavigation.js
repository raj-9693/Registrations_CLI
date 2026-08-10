
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignupScreen ,
           LoginScreen,
           OTPScreen,
           ForgotPasswordScreen,
           RecreatePasswordScreen} from '../Screen/AuthScreen';
           

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
   
   <Stack.Navigator 
        initialRouteName="Login" screenOptions={{headerShown: false, }}
>
<Stack.Screen  name='Login' component={LoginScreen}></Stack.Screen>
<Stack.Screen  name='Signup' component={SignupScreen}></Stack.Screen>
<Stack.Screen  name='ForgotPassword' component={ForgotPasswordScreen}></Stack.Screen>
<Stack.Screen  name='Otp' component={OTPScreen}></Stack.Screen>
<Stack.Screen  name='RecreatePassword' component={RecreatePasswordScreen}></Stack.Screen>


</Stack.Navigator>

   
  )
}

export default AuthNavigation;