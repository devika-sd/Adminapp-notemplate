import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../action/user-action';

class Adduser extends Component {
    constructor() {
        super();
        this.state = {
            name: '', email: '', password: '', phonenumber: '', address: '', nameError: '', emailError: '', passwordError: '',
            phonenumberError: '', addressError: '', namevalid: 0, emailvalid: 0, passwordvalid: 0, address: 0, phonenumbervalid: 0, addressvalid: 0,
            role: '', roleError:'', rolevalid: 0
        };
    }

    name(event) {
        let value = event.target.value
        const name = new RegExp('[a-zA-Z\s]{5,20}')
        if (!name.test(value)) {
            this.setState({ nameError: "please enter a valid firstname", namevalid: 0 })
        }
        else {
            this.setState({ nameError: '', namevalid: 1 })
        }
        this.setState({ name: value })
    }

    // lastname(event) {
    //     let value = event.target.value
    //     const lastname = new RegExp('[a-zA-Z\s]{5,15}')
    //     if (!lastname.test(value)) {
    //         this.setState({ lastnameError: "please enter a valid lastname", lastnamevalid: 0 })
    //     }
    //     else {
    //         this.setState({ lastnameError: '', lastnamevalid: 1 })
    //     }
    //     this.setState({ lastname: value })
    // }

    // username(event) {
    //     let value = event.target.value
    //     const username = new RegExp('[a-zA-Z\s]{5,30}')
    //     if (!username.test(value)) {
    //         this.setState({ usernameError: "please enter a valid username", usernamevalid: 0 })
    //     }
    //     else {
    //         this.setState({ usernameError: '', usernamevalid: 1 })
    //     }
    //     this.setState({ username: value })
    // }


    emailCheck(event) {
        let value = event.target.value;
        var mail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",);
        if (!mail.test(value)) {
            this.setState({ emailError: "please enter a valid mail", emailvalid: 0 })
        }
        else {
            this.setState({ emailError: '', emailvalid: 1 })
        }
        this.setState({ email: value })
    }

    passwordCheck(event) {
        let value = event.target.value;
        if (value.length < 6) {
            this.setState({ passwordError: "password must be greater than 6 characters", passwordvalid: 0 })
        }
        else {
            this.setState({ passwordError: '', passwordvalid: 1 })
        }
        this.setState({ password: value })
    }

    phonenumberCheck(event) {
        let value = event.target.value;
        const phonenumber = new RegExp("^[0-9]{10}$");
        if (!phonenumber.test(value)) {
            this.setState({ phonenumberError: "please enter a valid contact number", phonenumbervalid: 0 })
        }
        else {
            this.setState({ phonenumberError: '', phonenumbervalid: 1 })
        }
        this.setState({ phonenumber: value })

    }

    addressCheck(event) {
        let value = event.target.value
        const address = new RegExp('[a-zA-Z\s]{3,10}')
        if (!address.test(value)) {
            this.setState({ addressError: "please enter a valid address", addressvalid: 0 })
        }
        else {
            this.setState({ addressError: '', addressvalid: 1 })
        }
        this.setState({ address: value })
    }

    roleCheck(event){
        let value = event.target.value
        if(value === 0){
            this.setState({roleError: ' Please Select Role', rolevalid: 0 })
        }
        
        else{
            this.setState({role: value,  rolevalid: 1})
        }
    }

    validateUser() {
        // fetch('http://localhost:8080/api/v1/users/', {
        //     method: 'POST', 
        //     headers:authHeader(),
        //     body: JSON.stringify({name:this.state.name,email:this.state.email,password:this.state.password,phonenumber:this.state.phonenumber,address:this.state.address,role:'user'}),
        //     })
        //     .then(response => response.json())
        //     .then(data=>{
        //         console.log(data);
        //         if (data.status === true)
        //         {
        //             alert(data.message)
        //         }
        //         else
        //         {
        //             alert(data.message)
        //         }
        //     })
        let user = { name: this.state.name, email: this.state.email, password: this.state.password, phonenumber: this.state.phonenumber, address: this.state.address, role:this.state.role };
        console.log(user)
        this.props.onAddUser(user);
    }


    render() {
        var check = true;
        if ((this.state.emailvalid === 1) && (this.state.passwordvalid === 1) && (this.state.namevalid === 1) && (this.state.addressvalid === 1) && (this.state.phonenumbervalid === 1) &&(this.state.rolevalid === 1)) {
            check = false;
        }
        // console.log(this.validatecount);
        return (
            <div>
                <div className="page-header" style={{ width: '80%', margin: '10px auto' }}>
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title text-primary">Add User</h4><br />
                                    <form className="forms-sample">
                                        <Form.Group>
                                            <Form.Control type="text" className="form-control" onChange={this.name.bind(this)} id="exampleInputUsername1" placeholder="Name" size="lg" />
                                            <p className="help-block text-danger">{this.state.nameError}</p>
                                        </Form.Group><br />

                                        {/* <Form.Group>
                                            <Form.Control type="text" onChange={this.lastname.bind(this)} id="exampleInputUsername1" placeholder="LastName" size="lg" />
                                           <p className="help-block text-danger">{this.state.lastnameError}</p>
                                        </Form.Group><br /> */}

                                        {/* <Form.Group>
                                            <Form.Control type="text" onChange={this.username.bind(this)} id="exampleInputUsername1" placeholder="Username" size="lg" />
                                           <p className="help-block text-danger">{this.state.usernameError}</p>
                                        </Form.Group><br /> */}

                                        <Form.Group>
                                            <Form.Control type="email" className="form-control" onChange={this.emailCheck.bind(this)} className="form-control" id="exampleInputEmail1" placeholder="Email" size="lg" />
                                            <p className="help-block text-danger">{this.state.emailError}</p>
                                        </Form.Group><br />

                                        <Form.Group>
                                            <Form.Control type="password" className="form-control" onChange={this.passwordCheck.bind(this)} className="form-control" id="exampleInputPassword1" placeholder="Password" size="lg" />
                                            <p className="help-block text-danger">{this.state.passwordError}</p>
                                        </Form.Group><br />

                                        <Form.Group>
                                            <Form.Control type="number" className="form-control" onChange={this.phonenumberCheck.bind(this)} id="exampleInputUsername1" placeholder="Contact Number" size="lg" />
                                            <p className="help-block text-danger">{this.state.phonenumberError}</p>
                                        </Form.Group><br />

                                        <Form.Group>
                                            <Form.Control as="select" onChange={this.roleCheck.bind(this)} custom size="lg">
                                                <option value="0">Select Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </Form.Control>
                                            <p className="help-block text-danger">{this.state.roleError}</p>
                                        </Form.Group><br />

                                        <Form.Group>
                                            <Form.Control id="exampleInputUsername1" className="form-control" onChange={this.addressCheck.bind(this)} as="textarea" rows={3} placeholder="Address" size="lg" />
                                            <p className="help-block text-danger">{this.state.addressError}</p>
                                        </Form.Group><br />
                                        <Button type="button" className="btn btn-gradient-primary mr-2" onClick={this.validateUser.bind(this)} disabled={check} >Add</Button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUser: (user) => dispatch(actions.addusers(user))
    }
}

// export default AddWorkout;
export default connect(mapStateToProps, mapDispatchToProps)(Adduser);