import React from 'react';
import AuthNavigator from './config/AuthNavigator';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <AuthNavigator />
    </AuthProvider>
  );
}

export default App;