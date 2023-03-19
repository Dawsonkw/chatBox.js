import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

// This component is a context provider, it's designed to share its state 
// and actions with any descendant components that consume the context.
export const ChatsContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: 'null',
        user: {},
    };
    // chatReducer is a reducer function, The state argument represents the current state of the context, and 
    // the action argument is an object that describes the type of action being performed and any relevant data
    const chatReducer = (state, action) => {

        // switch checks the action.type property to determine which action should be performed.
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    combinedId: 
                        currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,           
                };
            //for the CLEAR_DATA action, the reducer returns the INITIAL_STATE object, & resets the context state
            case 'CLEAR_DATA': 
                return INITIAL_STATE;
            default: 
                return state;
        }
    };
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatsContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatsContext.Provider>
    );
};