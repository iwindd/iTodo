// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoProvider } from './contexts/todo';
import HomeScreen from './screens/home';
import AddScreen from './screens/add';
import EditScreen from './screens/edit';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <TodoProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: "iTodo" }} />
                    <Stack.Screen name="Add" component={AddScreen} options={{ title: "เพิ่ม" }} />
                    <Stack.Screen name="Edit" component={EditScreen} options={{ title: "แก้ไข" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </TodoProvider>
    );
}
export default App;