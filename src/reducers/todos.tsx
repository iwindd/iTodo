import { Todo } from '../typings';
type Type = "Add" | "Remove" | "Removes" | "Edit";
type Action = {
    type: Type,
    payload: Todo,
    group?: string | number[]
};

const reducer = (states: Todo[], action: Action) => {
    switch (action.type) {
        case "Add":
            return [...states, action.payload]
        case "Remove":
            return states.filter((state: Todo) => state.id !== action.payload?.id)
        case "Removes":
            return states.filter((state: Todo) => state.group !== action?.group)
        case "Edit":
            return states.map((state: Todo) =>
                state.id === action.payload.id ? { ...state, ...action.payload } : state
            );
        default:
            return states
    }
}

export default reducer