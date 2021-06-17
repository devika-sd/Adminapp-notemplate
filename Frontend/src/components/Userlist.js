import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import authHeader from '../services/auth-header'
import Pagination from 'react-bootstrap/Pagination'
import {Link} from 'react-router-dom'
export default class Userlist extends Component {

    constructor() {
        super()
        this.state = { users: [], active: 1, pageno: [1, 2, 3] }
    }

    componentDidMount() {
        // fetch('http://localhost:8080/api/v1/users/',{
        //     headers: authHeader() 
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data);
        //     this.setState({users: data.data})
        // })
        this.getUsers();
    }


    onDeleteUser(email) {
        console.log(email)
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
                this.getUsers();
                console.log(data)
            });
    }

    getUsers() {
        // console.log(this.state.active)
        fetch('http://localhost:8080/api/v1/users?page=' + this.state.active + "&limit=" + 3, {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ users: data.data })
            })
    }

    onBlockUser(email, status) {
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
                this.getUsers();
                console.log(data)
            });
    }
    onUpdateUser(id) {
        this.props.history.push("/updateuser/" + id);
    }
    async changepage(value) {
        await this.setState({ active: value });
        await this.getUsers();
        console.log(this.state.active)

    }
    async updatepagination(current) {
        if (this.state.pageno[2] < 12) {
            if (current === "next") {
                var temparr = [...this.state.pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] + 3;
                }
                let tempactive = temparr[0];
                await this.setState({ pageno: temparr, active: tempactive });
                await this.getUsers();
            }
        }
        if (current === "prev") {
            if (this.state.pageno[0] !== 1) {
                var temparr = [...this.state.pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] - 3;
                }
                let tempactive = temparr[0];
                console.log(tempactive)
                await this.setState({ pageno: temparr, active: tempactive });
                await this.getUsers();
            }
        }
    }

    render() {
        let items = this.state.pageno.map((value) => {
            return (<Pagination.Item key={value} onClick={() => { this.changepage(value) }} active={value === this.state.active}>
                {value}
            </Pagination.Item>)

        })

        let userList = this.state.users.map((user, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.address}</td>
                    <td><Link to={"/userprofile/"+user._id}><button className="btn btn-primary" >Update</button></Link> </td>
                    <td><button className="btn btn-primary" onClick={() => { this.onDeleteUser(user.email) }}> Delete </button></td>
                    <td><button className="btn btn-primary" onClick={() => { this.onBlockUser(user.email, user.status) }}>{user.status ? "Block" : "Unblock"}  </button></td>
                </tr>
            )
        })

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Userlist</a>
                    </div>
                </nav>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UserName</th>
                            <th>Email Id</th>
                            <th>Contact Number</th>
                            <th>Address</th>
                            <th>update</th>
                            <th>delete</th>
                            <th>Block/Unblock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </Table>
                <div style={{marginLeft:"45%"}}>
                    <Pagination>
                        <Pagination.Prev onClick={() => { this.updatepagination("prev") }} />
                        {items}
                        <Pagination.Next onClick={() => { this.updatepagination("next") }} />
                    </Pagination>
                </div>
            </div>
        )
    }
}
