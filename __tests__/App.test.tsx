// Import necessary modules and dependencies for testing
import React from 'react';
import { render } from '@testing-library/react-native';

import { TaskProvider } from '../src/context/TaskContext';
import Navigation from '../src/navigation';

describe('<App />', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      
        <TaskProvider>
          <Navigation />
        </TaskProvider>
      
    );

    // Assert that the component rendered correctly
    expect(getByTestId('app-root')).toBeDefined();
  });
});
