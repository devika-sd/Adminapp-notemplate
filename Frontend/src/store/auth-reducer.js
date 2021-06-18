import * as actions from '../action/auth-actions';
let initialState = {
    authenticated: false
}
// Reducers in store to modify state -- don't directly manipulate state
const reducer = (state = initialState, action) =>{
    console.log('Action recieved at reducer***  ', action);
    switch(action.type){
        case actions.USER_LOGIN:
            return {
                authenticated: action.payload
            }       
        default : return state
    }

}
export default reducer;