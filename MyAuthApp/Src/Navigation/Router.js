
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from './AuthNavigation'
import MainNavigation from './MainNavigation'

const RouterNavigation=()=>{
     let condision=false
     return condision?<MainNavigation/> :<AuthNavigation/> 

}

const Router = () => {
  return (
  <NavigationContainer>
   <RouterNavigation/>
  </NavigationContainer>
  )
}

export default Router