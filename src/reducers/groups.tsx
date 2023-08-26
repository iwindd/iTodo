import { Group } from '../typings';

type Type = "Add" | "Remove" | "Edit" | "SET_GROUPS";
type Action = {
    type: Type,
    payload: Group | Group[]
};

const reducer = (states: any, action: Action) => {
    switch (action.type) {
        case "Add":
            return [...states, action.payload];
        case "Remove":
            const groupToRemove = action.payload as Group; 
            return states.filter((state: Group) => state.id !== groupToRemove.id);
        case "Edit":
            const editedGroup = action.payload as Group; 
            return states.map((state: Group) =>
                state.id === editedGroup.id ? { ...state, ...editedGroup } : state
            );
        case "SET_GROUPS":
            if (Array.isArray(action.payload)) {
                return action.payload; 
            }
            return states; 
        default:
            return states;
    }
};

export default reducer;
