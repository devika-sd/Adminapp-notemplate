export const USER_LOGIN = "USER_LOGIN"



export const login = (success) => {
    console.log('In auth action: ', success)
    if(!success){
        console.log('Removing token ****************** ')
        localStorage.removeItem('token');
    }
    return {
        type: USER_LOGIN,
        payload: success
    }
}

export const userLogin = (user) => {

    // hardcoded
    // let workouts =  [
    //     {"title": "Run for 5 mins (from actions)", "desc": "test desc", cbpm: 343}
    // ]

    // delayed dispatch available

    console.log('In fech workout action *******************************')
    return dispatch => {

        return fetch('http://localhost:8080/api/v1/users/login', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.success){
                console.log('In auth servicee ......')
                localStorage.setItem('token', data.token);
                dispatch(login(data.success));
                // show an alert message or transition into dashboard component
            }
        })

    }


    // fetch it from server side

    // return {
    //     type: FETCH_WORKOUTS,
    //     payload: workouts
    // }
}