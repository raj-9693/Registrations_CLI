import Router from './Src/Navigation/Router'
import React from 'react';
import { AuthProvider } from './Src/Context/AuthContext'


const App = () => {
  return (
    <AuthProvider>
        <Router />
    </AuthProvider>
  );
}

export default App;
