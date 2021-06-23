import authHeader from '../services/auth-header'

export const FETCH_USERS = "FETCH_USERS"
export const UPDATE_USER = "UPDATE_USER"
export const LOGIN_USER = "LOGIN_USER"
export const ADD_USER = "ADD_USER"
export const ERROR_USER = "ERROR_USER"


export const fetchusers = (filter) => {
    //add your code
    console.log("***************"+filter);
    return dispatch => {
        fetch('http://localhost:8080/api/v1/users?sort=name&' + filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ users: data.data })
                console.log(data.total)
                dispatch({ type: FETCH_USERS, payload: data });
            })
    }
}

export const updateusers = (_id,roleData) => {
    //add your code
    return dispatch => {
        fetch('http://localhost:8080/api/v1/users/'+_id,
            {
                method: 'PUT',
                headers: authHeader(),
                body: JSON.stringify(roleData)
            })
            .then(res=>res.json())
            .then(data => {
                console.log("*************"+data.success);
                if (data.success === true) {
                    // this.setState({ message: "Successfully inserted" })
                    dispatch({ type: UPDATE_USER, payload: data.data });
                }
                else{
                    console.log("*************"+data.success);
                    dispatch({
                        type: ERROR_USER,
                        payload: data.message
                    });
                }
            })
    }
}

export const deleteusers = (email, filter) => {
    //add your code
    return dispatch => {
        fetch('http://localhost:8080/api/v1/users/' + email, {
            method: 'DELETE',
            // headers: { 'Content-Type': 'application/json' }
            headers: authHeader()
            //body: JSON.stringify(inputs)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch(fetchusers(filter));
            });
    }
}

export const blockusers = (email, status, filter) => {
    //add your code
    return dispatch => {
        fetch('http://localhost:8080/api/v1/users/block/' + email + '&' + !status, {
            method: 'PATCH',
            // headers: { 'Content-Type': 'application/json' }
            //body: JSON.stringify(inputs)
            headers: authHeader()
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // dispatch({type: BLOCK_USER,payload:data.user});
                dispatch(fetchusers(filter));
            });
    }
}

export const loginusers = (user) => {
    //add your code
    return dispatch => {

        return fetch('http://localhost:8080/api/v1/users/login', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // localStorage.setItem('token', data.token);
                    console.log("token"+data.token)
                    localStorage.setItem('token', data.token);
                    dispatch({
                        type: LOGIN_USER,
                        payload: data
                    });
                    // show an alert message or transition into dashboard component ERROR_USER
                }
                else {
                    dispatch({
                        type: ERROR_USER,
                        payload: data
                    });
                }
            })
        }
}
const saveUser = (users) => {
    return {
        type: ADD_USER,
        payload: users
    }
}

export const addusers = (user) => {
    //add your code
    return dispatch => {
        fetch('http://localhost:8080/api/v1/users/', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(users => {
                console.log(users)
                if(users.success)
                {
                    dispatch(fetchusers(""));
                    dispatch(saveUser(users));
                }
                else
                {
                    dispatch({
                        type: ERROR_USER,
                        payload: users
                    });
                }
                
            })
    }
}
