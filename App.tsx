import React from 'react';
import Navigation from './src/navigation';
import { TaskProvider } from './src/context/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <Navigation />
    </TaskProvider>
  );
};

export default App;
