import { Todo } from '../typings';
type Type = "Add" | "Remove" | "Edit";
type Action = {
    type: Type,
    payload: Todo
};

const reducer = (states: Todo[], action: Action) => {
    switch (action.type) {
        case "Add":
            return [...states, action.payload]
        case "Remove":
            return states.filter((state: Todo) => state.id !== action.payload?.id)
        case "Edit":
            return states.map((state: Todo) =>
                state.id === action.payload.id ? { ...state, ...action.payload } : state
            );
        default:
            return states
    }
}

export default reducer