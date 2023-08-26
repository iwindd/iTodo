import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoProvider } from './contexts/todo';
import Index from './screens/home';
import Group from './screens/groups';
import Todo from './screens/todos';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <TodoProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="index">
                    <Stack.Screen name="index" component={Index} options={{ title: "iTodo" }} />
                    <Stack.Screen name="group" component={Group} options={{ title: "iTodo" }} />
                    <Stack.Screen name="todo" component={Todo} options={{ title: "iTodo" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </TodoProvider>
    );
}
export default App;