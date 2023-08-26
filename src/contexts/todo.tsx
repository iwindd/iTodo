import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, Status, Group } from '../typings/todo';
import GroupReducer from '../reducers/groups';

export interface TodoUpdate {
    id: string;
    title?: string;
    description?: string;
    status?: Status;
}

interface TodoContextType {
    todos: Todo[];
    Group: any;
    addTodo: (newTodo: Todo) => void;
    updateTodo: (update: TodoUpdate) => void;
    deleteTodo: (target: any) => void;
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
    // Load todos from AsyncStorage on component mount
    const [groups, setGroups] = useState<Group[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const storedTodos = await AsyncStorage.getItem('todos');
                if (storedTodos) {
                    setTodos(JSON.parse(storedTodos));
                }
            } catch (error) {
                console.error('Error loading todos from AsyncStorage:', error);
            }
        };

        loadTodos();
    }, []);

    const addTodo = (newTodo: Todo) => {
        setTodos([...todos, newTodo]);
    };

    const updateTodo = (update: TodoUpdate) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === update.id
                    ? { ...todo, ...update }
                    : todo
            )
        );
    };

    const deleteTodo = (targetId: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.filter(todo => todo.id !== targetId);
            return updatedTodos;
        });
    };

    useEffect(() => {
        const saveTodos = async () => {
            try {
                await AsyncStorage.setItem('todos', JSON.stringify(todos));
            } catch (error) {
                console.error('Error saving todos to AsyncStorage:', error);
            }
        };

        saveTodos();
    }, [todos]);

    const value: TodoContextType = {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        ...{
            Group:  () => React.useReducer(GroupReducer, groups)
        }
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};
