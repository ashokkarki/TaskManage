import 'react-native-get-random-values'
import React, { useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import { RootStackParamList } from '../types';

type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTask'>;

type Props = {
  navigation: AddTaskScreenNavigationProp;
};

const AddTaskScreen: React.FC<Props> = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
  });

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={(values: { title: string; description: string; }, { resetForm }: any) => {
          const newTask = {
            id: uuidv4(),
            title: values.title,
            description: values.description,
            completed: false,
          };
          
          addTask(newTask);
          resetForm();
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
            {touched.description && errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
            <Button title="Add Task" onPress={handleSubmit} />
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

export default AddTaskScreen;
