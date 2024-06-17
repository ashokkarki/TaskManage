import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TaskContext } from '../context/TaskContext';
import AddTaskScreen from '../screens/AddTaskScreen';

// Mock TaskContext
const mockTaskContext = {
  tasks: [],
  addTask: jest.fn(),
  editTask: jest.fn(),
  deleteTask: jest.fn(),
  toggleTaskCompletion: jest.fn(),
};

// Mock navigation prop
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  setOptions: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
};

describe('<AddTaskScreen />', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <TaskContext.Provider value={mockTaskContext}>
        <AddTaskScreen navigation={mockNavigation} />
      </TaskContext.Provider>
    );

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');
    const addButton = getByText('Add Task');

    expect(titleInput).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(addButton).toBeDefined();
  });

  it('validates input fields correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <TaskContext.Provider value={mockTaskContext}>
        <AddTaskScreen navigation={mockNavigation} />
      </TaskContext.Provider>
    );

    const titleInput = getByPlaceholderText('Title');
    const descriptionInput = getByPlaceholderText('Description');
    const addButton = getByText('Add Task');

    fireEvent.press(addButton);

    await waitFor(() => {
      expect(getByText('Title is required')).toBeDefined();
    });

    fireEvent.changeText(titleInput, 'Test Title');
    fireEvent.changeText(descriptionInput, 'Test Description');

    fireEvent.press(addButton);

    await waitFor(() => {
      expect(mockTaskContext.addTask).toHaveBeenCalledTimes(1);
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
