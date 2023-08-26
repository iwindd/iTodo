import { Group } from '../typings/todo';
type Type = "Add" | "Remove";
type Action = {
    type: Type,
    payload?: Group
};

const reducer = (states: any, action: Action) => {
    switch (action.type) {
        case "Add":
            return [...states, action.payload]
        case "Remove":
            return states.filter((state : Group) => state.id !== action.payload?.id)
        default:
            return states
    }
}

export default reducer