import * as actions from '../action/order-action';
let initialState = {
    orders: [
    ],
    totalorders:""
}

const reducer = (state = initialState, action) =>{
    console.log('Action recieved at reducer***  ', action);
    switch(action.type){
        case actions.FETCH_ORDERS:
            return {
                ...state,
                orders: action.payload.data,
                totalorders:action.payload.total
            }
        case actions.UPDATE_ORDERS:
            return {
                ...state,
                message: action.payload.message
            }
        case actions.ERROR_ORDERS:
            return {
                // users: action.payload
                ...state,
                message: action.payload.message
            }
        default : return state
    }
 
}

export default reducer;