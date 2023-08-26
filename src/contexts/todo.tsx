import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { Todo, Group } from '../typings';
import GroupReducer from '../reducers/groups';
import TodoReducer from '../reducers/todos';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TodoContextType {
    groups: Group[];
    todos: Todo[];
    groupDispatch: React.Dispatch<any>;
    todoDispatch: React.Dispatch<any>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [groups, groupDispatch] = useReducer(GroupReducer, []);
    const [todos, todoDispatch] = useReducer(TodoReducer, []);

    React.useEffect(() => {
        AsyncStorage.getItem('groups')
            .then(savedGroups => {
                if (savedGroups) {
                    groupDispatch({ type: 'SET_GROUPS', payload: JSON.parse(savedGroups) });
                }
            });

        AsyncStorage.getItem('todos')
            .then(savedTodos => {
                if (savedTodos) {
                    todoDispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
                }
            });
    }, []);

    React.useEffect(() => {
        AsyncStorage.setItem('groups', JSON.stringify(groups));
        AsyncStorage.setItem('todos', JSON.stringify(todos));
    }, [groups, todos]);


    const value: TodoContextType = {
        groups,
        groupDispatch,
        todos,
        todoDispatch
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};