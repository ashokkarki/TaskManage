// src/screens/EditTaskScreen.tsx
import React, { useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { TaskContext, Task } from '../context/TaskContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import { ApplicationStackParamList, NavigationProp } from '../types';

type EditTaskScreenProp = RouteProp<ApplicationStackParamList, keyof ApplicationStackParamList>

type Props = {
  navigation: any;
  route: any;
};

const EditTaskScreen: React.FC<Props> = () => {
  const { editTask, toggleTaskCompletion } = useContext(TaskContext);
  const navigation = useNavigation<NavigationProp < keyof ApplicationStackParamList > > ()
  const route = useRoute <EditTaskScreenProp>()
  console.warn(route.params);
  
  const { task } = route.params;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
  });

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Formik
        initialValues={{ title: task.title, description: task.description || '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const updatedTask: Task = { ...task, title: values.title, description: values.description };
          editTask(updatedTask);
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {touched.title && errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline={true}
            />
            {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text> }
            <Button title="Save Changes" onPress={()=>{handleSubmit()}} />
            <Button
              title={task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              onPress={() => {
                toggleTaskCompletion(task.id);
                navigation.goBack();
              }}
            />
          </View>
        )}
      </Formik>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default EditTaskScreen;
