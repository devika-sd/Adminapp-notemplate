import * as actions from '../action/user-action';
let initialState = {
    users: [
    ],
    currentUser:"",
    totaluser:""
}

// Reducers in store to modify state -- don't directly manipulate state
const reducer = (state = initialState, action) =>{
    console.log('Action recieved at reducer***  ', action);
    switch(action.type){
        case actions.FETCH_USERS:
            return {
                ...state,
                message:"",
                users: action.payload.data,
                totaluser:action.payload.total,
            }
        case actions.UPDATE_USER:
            return {
                ...state,
                 users: action.payload,
                 message: action.payload.message
            }
        case actions.LOGIN_USER:
            return {
                // users: action.payload
                ...state,
                currentUser:action.payload.userid,
                message: action.payload.message
            }
        case actions.ERROR_USER:
            return {
                // users: action.payload 
                ...state,
                message: action.payload.message
            }
        case actions.ADD_USER:
                return {
                    ...state,
                    message: action.payload.message
                }
        case actions.FILTER_USER:
                return {
                    ...state,
                    users: action.payload.data
                }
        default : return state
    }
 
}

export default reducer;