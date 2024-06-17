// Import necessary modules and dependencies for testing
import React from 'react';
import { render } from '@testing-library/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from '../src/context/TaskContext';
import App from '../App';

describe('<App />', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <GestureHandlerRootView>
        <TaskProvider>
          <App />
        </TaskProvider>
      </GestureHandlerRootView>
    );

    // Assert that the component rendered correctly
    expect(getByTestId('app-root')).toBeDefined();
  });
});
