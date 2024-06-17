
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import AddTaskScreen from '../src/screens/AddTaskScreen';
import EditTaskScreen from '../src/screens/EditTaskScreen';
import { TaskProvider } from '../src/context/TaskContext';

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

describe('Navigation', () => {
  it('renders HomeScreen correctly', () => {
    const { getByText } = render(<MockedNavigator />);
    expect(getByText('Longest Streak: 0')).toBeTruthy();
  });

  it('navigates to AddTaskScreen when Add Task button is pressed', () => {
    const { getByText } = render(<MockedNavigator />);
    fireEvent.press(getByText('Add Task'));
    expect(getByText('Add Task')).toBeTruthy();
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
