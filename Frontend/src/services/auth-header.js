function authHeader() {
    const token = localStorage.getItem('token');
    if(token){
        return {'Authorization': 'Bearer ' + token , 'content-type': 'application/json'}
    }
    else{
        return {'content-type': 'application/json'}
    }
}
export default authHeader;
