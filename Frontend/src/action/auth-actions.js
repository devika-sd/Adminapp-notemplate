export const USER_LOGIN = "USER_LOGIN"



export const login = (status) => {
    console.log('In auth action: ', status)
    if(!status){
        console.log('Removing token ****************** ')
        localStorage.removeItem('token');
    }
    return {
        type: USER_LOGIN,
        payload: status
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
            if(data.status){
                console.log('In auth servicee ......')
                localStorage.setItem('token', data.token);
                dispatch(login(data.status));
                // show an alert message or transition into dashboard component
            }
            else{
                throw new Error(data.message);
            }
        })

    }


    // fetch it from server side

    // return {
    //     type: FETCH_WORKOUTS,
    //     payload: workouts
    // }
}