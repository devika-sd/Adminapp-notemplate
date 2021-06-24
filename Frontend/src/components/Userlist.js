import React, { Component } from 'react'
import { Table,Form,FormControl,Button } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as useractions from '../action/user-action';
class Userlist extends Component {

    constructor(props) {
        super(props)
        this.state = { users: [],word:'', active: 1, maxpage: 1, limit: 5, pageno: [1, 2, 3], open: false }
    }

    componentDidMount() {
        this.state.word===''? this.getUsers(): this.props.onfilterUsers(this.state.word,this.state.active,this.state.limit);
    }

    async changepage(value) {
        await this.setState({ active: value });
        this.state.word===''?await this.getUsers():await this.props.onfilterUsers(this.state.word,this.state.active,this.state.limit);
    }
    async getUsers() {
        await this.props.onGetUsers("page=" + this.state.active + "&limit=" + this.state.limit);
    }
    async updatepagination(current) {
        var max = 1;
        max = this.props.total / this.state.limit;
        console.log(max);
        this.setState({ maxpage: max });
        if (current === 'initial') {
            let temparrr = [1, 2, 3];
            await this.setState({ pageno: temparrr, active: 1 });
            this.state.word===''?await this.getUsers():await this.props.onfilterUsers(this.state.word,this.state.active,this.state.limit);
        }
        if (current === 'final') {
            let temp = max > Math.floor(this.props.total / this.state.limit) ? Math.floor(max) + 1 : Math.floor(max);
            let temparrr = [temp - 2, temp - 1, temp];
            await this.setState({ pageno: temparrr, active: temp });
            this.state.word===''?await this.getUsers():await this.props.onfilterUsers(this.state.word,this.state.active,this.state.limit);
        }
        if (this.state.pageno[2] < max) {
            if (current === "next") {
                var temparr = [...this.state.pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] + 1;
                }
                let tempactive = temparr[0];
                await this.setState({ pageno: temparr, active: tempactive });
                this.state.word===''?await this.getUsers():await this.props.onfilterUsers(this.state.word,this.state.active,this.state.limit);
            }
        }
        if (current === "prev") {
            if (this.state.pageno[0] !== 1) {
                var temparr = [...this.state.pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] - 1;
                }
                let tempactive = temparr[0];
                await this.setState({ pageno: temparr, active: tempactive });
                this.state.word===''?await this.getUsers():await this.props.onfilterUsers(this.state.word,this.state.active,this.state.limit);
            }
        }
    }

    onDeleteUser(email) {
        this.props.onDelete(email, "page=" + this.state.active + "&limit=" + this.state.limit);
    }

    onBlockUser(email, status) {
        this.props.onBlock(email, status, "page=" + this.state.active + "&limit=" + this.state.limit);
    }
    onUpdateUser(id) {
        this.props.history.push("/updateuser/" + id);
    }
    async filterdata(e)
    {
        if(e.target.value.length>=3)
        {
            this.setState({word:e.target.value,active:1})
            console.log(e.target.value);
            this.props.onfilterUsers(e.target.value,this.state.active,this.state.limit);

        }
        else
        {
            await this.getUsers()
        }
    }

    render() {
        console.log(this.state.word)
        let items = this.state.pageno.map((value) => {
            return (<Pagination.Item key={value} onClick={() => { this.changepage(value) }} active={value === this.state.active}>
                {value}
            </Pagination.Item>)

        })

        let userList = this.props.users.map((user, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td><Link to={"/userprofile/" + user._id}><button className="btn btn-primary" >Update</button></Link> </td>
                    <td><button className="btn btn-primary" onClick={() => { this.onDeleteUser(user.email) }}> Delete </button></td>
                    <td><button className="btn btn-primary" onClick={() => { this.onBlockUser(user.email, user.isBlocked) }}>{user.isBlocked ? "Unblock" : "Block"}  </button></td>
                </tr>
            )
        })

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Userlist</a>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" onChange={this.filterdata.bind(this)} className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </div>
                </nav>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UserName</th>
                            <th>Email Id</th>
                            <th>Contact Number</th>
                            <th>update</th>
                            <th>delete</th>
                            <th>Block/Unblock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </Table>
                <div>
                    <Pagination style={{ display: 'flex', width: '220px', margin: 'auto' }}>
                        <Pagination.First onClick={() => { this.updatepagination("initial") }} />
                        <Pagination.Prev onClick={() => { this.updatepagination("prev") }} />
                        {items}
                        <Pagination.Next onClick={() => { this.updatepagination("next") }} />
                        <Pagination.Last onClick={() => { this.updatepagination("final") }} />
                    </Pagination>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users,
        total: state.userReducer.totaluser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBlock: (email, status, filter) => dispatch(useractions.blockusers(email, status, filter)),
        onDelete: (email, filter) => dispatch(useractions.deleteusers(email, filter)),
        onGetUsers: (filter) => dispatch(useractions.fetchusers(filter)),
        onfilterUsers: (word,page,limit) => dispatch(useractions.filteruserbyname(word,page,limit))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);