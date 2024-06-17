import React, { useContext, useState} from 'react';
import { View, FlatList, RefreshControl, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Task, TaskContext } from '../context/TaskContext';
import {  Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ApplicationStackParamList, NavigationProp } from '../types';
import { TItem } from '../types/GenericTypes';


type Props = {
  navigation: any
  route: any;
};
const HomeScreen: React.FC<Props> = ({  }) => {
  const { tasks, toggleTaskCompletion, deleteTask } = useContext(TaskContext);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp <keyof ApplicationStackParamList> >()


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const longestStreak = (tasks: Task[]) => {
    let maxStreak = 0;
    let currentStreak = 0;
    tasks.forEach(task => {
      if (task.completed) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    });
    return maxStreak;
  };

  const leftActions = (item:TItem) => (
    <View style={styles.leftActionContainer}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('EditTask', { task: item })
        }} style={styles.editButton}>
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const rightActions = (item:TItem) => (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity onPress={() => {
        deleteTask(item.id)}} style={styles.deleteButton}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.streakText}>Longest Streak: {longestStreak(tasks)}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {          
          return(
            <Swipeable 
            renderLeftActions={() => leftActions(item)} 
            renderRightActions={() => rightActions(item)}
            >
              <Animated.View style={styles.taskContainer}>
                <Text style={item.completed ? styles.completedTask : styles.task}>{item.title}</Text>
                <Text>{item.description}</Text>
                <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} style={styles.markerButton} >
                  <Text style={item.completed? styles.completeButton:styles.incompleteButton} >{item.completed ? 'Incomplete' : 'Completed'}</Text>
                </TouchableOpacity>
              </Animated.View>
            </Swipeable>
          )
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskContainer: {
    marginBottom: 16,
    backgroundColor:"#fff",
    padding:15
  },
  task: {
    fontSize: 18,
  },
  completedTask: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  addButton: {
    position: 'absolute',
    bottom: 18,
    right: 16,
    padding: 16,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#f0ad4e'
  },
  addButtonText: {
    fontSize: 18,
  },
  streakText: {
    fontSize: 18,
    marginBottom: 16,
    color:"#000"
  },
  leftActionContainer: {
    flexDirection: 'row',
  },
  rightActionContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#f0ad4e',
    padding: 10,
    justifyContent: 'center',
     marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    justifyContent: 'center',
     marginBottom: 16,
  },
  completeButton:{
    borderRadius:5,
    borderWidth:1,
    padding:'1.5%'
  },
  incompleteButton:{
    borderRadius:5,
    borderWidth:1,
    padding:'1.5%'
  },
  markerButton:{ flexWrap:'wrap',marginTop:'1.5%' }
});

export default HomeScreen;
