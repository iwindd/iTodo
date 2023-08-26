import { Todo } from '../typings';

type Type = "Add" | "Remove" | "Removes" | "Edit" | "SET_TODOS"; 
type Action = {
    type: Type,
    payload: Todo | Todo[], 
    group?: string | number[]
};

const reducer = (states: any, action: Action) => {
    switch (action.type) {
        case "Add":
            return [...states, action.payload];
        case "Remove":
            const todoIdToRemove = (action.payload as Todo).id; 
            return states.filter((state: Todo) => state.id !== todoIdToRemove);
        case "Removes":
            return states.filter((state: Todo) => state.group !== action.group);
        case "Edit":
            const editedTodo = action.payload as Todo; 
            return states.map((state: Todo) =>
                state.id === editedTodo.id ? { ...state, ...editedTodo } : state
            );
        case "SET_TODOS":
            if (Array.isArray(action.payload)) {
                return action.payload;
            }
            return states;
        default:
            return states;
    }
}

export default reducer;
