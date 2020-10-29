import React from 'react';
import Dashboard from './pages/Dashboard';
import GLobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <GLobalStyle />
      <Dashboard />
    </>
  );
};

export default App;
