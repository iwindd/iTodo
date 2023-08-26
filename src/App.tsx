import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoProvider } from './contexts/todo';
import HomeScreen from './screens/home';
import AddScreen from './screens/add';
import EditScreen from './screens/edit';

import Group from './screens/groups';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <TodoProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="index">
                    <Stack.Screen name="index" component={HomeScreen} options={{ title: "iTodo" }} />
                    <Stack.Screen name="group" component={Group}      options={{ title: "iTodo" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </TodoProvider>
    );
}
export default App;