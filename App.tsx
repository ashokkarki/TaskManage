import React from 'react';
import Navigation from './src/navigation';
import { TaskProvider } from './src/context/TaskContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <TaskProvider>
      <Navigation />
    </TaskProvider>
    </GestureHandlerRootView>
  );
};

export default App;
