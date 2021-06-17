import * as actions from '../action/user-action';
let initialState = {
    users: [
    ]
}

// Reducers in store to modify state -- don't directly manipulate state
const reducer = (state = initialState, action) =>{
    console.log('Action recieved at reducer***  ', action);
    switch(action.type){
        case actions.FETCH_USERS:
            return {
                // users: action.payload
            }
        case actions.UPDATE_USER:
            return {
                // users: action.payload
            }
        case actions.DELETE_USER:
            return {
                // users: action.payload
            }  
        case actions.BLOCK_USER:
            return {
                // users: action.payload
            }
        case actions.LOGIN_USER:
            return {
                // users: action.payload
            }
        case actions.ADD_USER:
            return {
                // users: action.payload
            }  
        default : return state
    }
 
}

export default reducer;