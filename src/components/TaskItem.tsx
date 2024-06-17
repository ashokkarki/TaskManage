import React from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { toggleTaskStatus, deleteTask } from '../redux/tasksSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <TaskContainer>
      <Title>{task.title}</Title>
      {task.description && <Description>{task.description}</Description>}
      <Actions>
        <Button onPress={handleToggle}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </Button>
        <Button onPress={handleDelete}>Delete</Button>
      </Actions>
    </TaskContainer>
  );
};

const TaskContainer = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.Button``;

export default TaskItem;