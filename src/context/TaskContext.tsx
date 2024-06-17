import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SECRETS } from '../secrets/appsecrets';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}



interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

interface ITaskProps {
  children: React.ReactNode
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [{
    id: '',
    title: '',
    description: '',
    completed: false
  }],
  addTask: (task: Task) => { },
  editTask: (task: Task) => { },
  deleteTask: (id: string) => { },
  toggleTaskCompletion: (id: string) => { }
} as TaskContextProps);

export const TaskProvider: React.FC<ITaskProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem(SECRETS.TASK_KEY);
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(SECRETS.TASK_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
