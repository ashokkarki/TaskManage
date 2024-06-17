// src/screens/__tests__/EditTaskScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TaskContext } from '../context/TaskContext';
import EditTaskScreen from '../screens/EditTaskScreen';

const mockNavigation = { goBack: jest.fn() };
const mockRoute = { params: { task: { id: '1', title: 'Test Task', description: 'Task description', completed: false } } };

const mockEditTask = jest.fn();
const mockToggleTaskCompletion = jest.fn();

describe('EditTaskScreen', () => {
  it('renders correctly and allows editing of task', () => {
    const { getByPlaceholderText, getByText } = render(
      <TaskContext.Provider value={{ editTask: mockEditTask, toggleTaskCompletion: mockToggleTaskCompletion }}>
        <NavigationContainer>
          <EditTaskScreen navigation={mockNavigation as any} route={mockRoute as any} />
        </NavigationContainer>
      </TaskContext.Provider>
    );

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');
    const saveButton = getByText('Save Changes');

    fireEvent.changeText(titleInput, 'Updated Task Title');
    fireEvent.changeText(descriptionInput, 'Updated Task Description');
    fireEvent.press(saveButton);

    expect(mockEditTask).toHaveBeenCalledWith({
      id: '1',
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: false,
    });

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('toggles task completion status', () => {
    const { getByText } = render(
      <TaskContext.Provider value={{ editTask: mockEditTask, toggleTaskCompletion: mockToggleTaskCompletion }}>
        <NavigationContainer>
          <EditTaskScreen navigation={mockNavigation as any} route={mockRoute as any} />
        </NavigationContainer>
      </TaskContext.Provider>
    );

    const toggleButton = getByText('Mark as Complete');
    fireEvent.press(toggleButton);

    expect(mockToggleTaskCompletion).toHaveBeenCalledWith('1');
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
