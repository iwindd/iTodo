import { Group } from '../typings/todo';
type Type = "Add" | "Remove" | "Edit";
type Action = {
    type: Type,
    payload: Group
};

const reducer = (states: any, action: Action) => {
    switch (action.type) {
        case "Add":
            return [...states, action.payload]
        case "Remove":
            return states.filter((state: Group) => state.id !== action.payload?.id)
        case "Edit":
            return states.map((state: Group) =>
                state.id === action.payload.id ? { ...state, ...action.payload } : state
            );
        default:
            return states
    }
}

export default reducer