import authHeader from '../services/auth-header'

export const FETCH_ORDERS = "FETCH_ORDERS"
export const UPDATE_ORDERS = "UPDATE_ORDERS"
export const ERROR_ORDERS = "ERROR_ORDERS"
const URL ="http://localhost:8080/api/v1/orders/";

export const fetchorders = (filter) => {
    //add your code
    console.log("*******ORDER********"+filter);
    return dispatch => {
        fetch(URL+'?sort=email&' + filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //this.setState({ users: data.data })
                console.log(data.total)
                dispatch({ type: FETCH_ORDERS, payload: data });
            })
    }
}

export const updateorders = (_id,orderdetails) => {
    //add your code
    return dispatch => {
        fetch(URL+_id,
            {
                method: 'PATCH',
                headers: authHeader(),
                body: JSON.stringify(orderdetails)
            })
            .then(res=>res.json())
            .then(data => {
                console.log("*************"+data.success);
                if (data.success === true) {
                    // this.setState({ message: "Successfully inserted" })
                    dispatch({ type: UPDATE_ORDERS, payload: data });
                }
                else{
                    console.log("*************"+data.success);
                    dispatch({
                        type: ERROR_ORDERS,
                        payload: data.message
                    });
                }
            })
    }
}