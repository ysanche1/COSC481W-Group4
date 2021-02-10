// HOLD ALL NAVIGATION STACKS FOR APP - ROUTES.JS
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//IMPORT STACHS
import DrawerNavigator from './DrawerNavigator';

export default function Routes() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}