import React from 'react';
import AuthNavigator from './config/AuthNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;