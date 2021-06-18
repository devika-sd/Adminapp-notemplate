import authHeader from '../services/auth-header'

export const FETCH_USERS = "FETCH_USERS"
export const UPDATE_USER = "UPDATE_USER"
export const LOGIN_USER = "LOGIN_USER"
export const ADD_USER = "ADD_USER"

export const fetchusers = (filter) => {
    //add your code
    console.log("***************"+filter);
    return dispatch => {
        fetch('http://localhost:8080/api/v1/users' + filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ users: data.data })
                console.log(data)
                dispatch({ type: FETCH_USERS, payload: data.data });
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
                if (data.status === 200) {
                    // this.setState({ message: "Successfully inserted" })
                    dispatch({ type: UPDATE_USER, payload: data.data[0] });
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
                if (data.status) {
                    // localStorage.setItem('token', data.token);
                    dispatch({
                        type: LOGIN_USER,
                        payload: data.userid
                    });
                    // show an alert message or transition into dashboard component
                }
                else {
                    throw new Error(data.message);
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
                dispatch(saveUser(users));
            })
    }
}
