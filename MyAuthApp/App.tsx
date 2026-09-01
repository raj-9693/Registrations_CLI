import Router from './Src/Navigation/Router'
import React from 'react';
import { AuthProvider } from './Src/Context/AuthContext'
import { NumberProviders } from './Src/Context/NumberContext'

const App = () => {
  return (
    <AuthProvider>
      <NumberProviders>
        <Router />
      </NumberProviders>
    </AuthProvider>
  );
}

export default App;
