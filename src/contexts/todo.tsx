import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { Todo, Group } from '../typings';
import GroupReducer from '../reducers/groups';

interface TodoContextType {
    groups: Group[];
    todos: Todo[];
    groupDispatch: React.Dispatch<any>; 
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

    const value: TodoContextType = {
        groups,
        groupDispatch,
        todos: [],
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};
