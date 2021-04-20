//INDEX.JS
// THIS FILE CONTAINS THE PROVIDER WHICH HOLDS ALL THE ROUTES FOR ‘CHAT APP’ NAVIGATION.
// MORGAN IVERSON

/************* NODE MODULES *************/
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

/************* LOCAL  COMPONENTS *************/
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

/************* PROVIDERS *************/
export default function Providers() {
  return (
    <PaperProvider>
      <AuthProvider>
      <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}