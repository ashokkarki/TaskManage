// __tests__/HomeScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskProvider } from '../context/TaskContext';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';

const Stack = createStackNavigator();

const MockedNavigator = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="EditTask" component={EditTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MockedNavigator />);
    expect(getByText('Longest Streak: 0')).toBeTruthy();
  });

  it('navigates to AddTaskScreen when Add Task button is pressed', () => {
    const { getByText } = render(<MockedNavigator />);
    fireEvent.press(getByText('Add Task'));
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('toggles task completion status', async () => {
    const { getByText, getByPlaceholderText } = render(<MockedNavigator />);
    fireEvent.press(getByText('Add Task'));
    
    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');

    fireEvent.changeText(titleInput, 'Test Task');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.press(getByText('Add Task'));

    await waitFor(() => {
      expect(getByText('Test Task')).toBeTruthy();
    });

    fireEvent.press(getByText('Mark as Complete'));
    await waitFor(() => {
      expect(getByText('Mark as Incomplete')).toBeTruthy();
    });
  });

  it('deletes a task correctly', async () => {
    const { getByText, getByPlaceholderText } = render(<MockedNavigator />);
    fireEvent.press(getByText('Add Task'));
    
    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');

    fireEvent.changeText(titleInput, 'Test Task');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.press(getByText('Add Task'));

    await waitFor(() => {
      expect(getByText('Test Task')).toBeTruthy();
    });

    fireEvent.press(getByText('Delete'));
    await waitFor(() => {
      expect(getByText('Test Task')).not.toBeTruthy();
    });
  });

  it('navigates to EditTaskScreen when Edit button is pressed', async () => {
    const { getByText, getByPlaceholderText } = render(<MockedNavigator />);
    fireEvent.press(getByText('Add Task'));

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');

    fireEvent.changeText(titleInput, 'Test Task');
    fireEvent.changeText(descriptionInput, 'Test Description');
    fireEvent.press(getByText('Add Task'));

    await waitFor(() => {
      expect(getByText('Test Task')).toBeTruthy();
    });

    fireEvent.press(getByText('Edit'));
    expect(getByText('Save Changes')).toBeTruthy();
  });
});
