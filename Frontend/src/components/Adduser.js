import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import authHeader  from '../services/auth-header';

class Adduser extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '', lastname: '', username: '',
            email: '', password: '', contactnumber:'', address:'', firstnameError: '', usernameError: '', emailError: '', passwordError: '', lastnameError: '',
            contactnumberError:'', addressError:'', firstnamevalid: 0, usernamevalid: 0, emailvalid: 0, passwordvalid: 0, lastnamevalid: 0, address: 0, contactnumbervalid: 0, addressvalid: 0
        };
    }

    firstname(event) {
        let value = event.target.value
        const firstname = new RegExp('[a-zA-Z\s]{5,20}')
        if (!firstname.test(value)) {
            this.setState({ firstnameError: "please enter a valid firstname", usernamevalid: 0 })
        }
        else {
            this.setState({ firstnameError: '', firstnamevalid: 1 })
        }
        this.setState({ firstname: value })
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

    contactnumberCheck(event){
        let value = event.target.value;
        const contactnumber = new RegExp("^[0-9]{10}$");
        if (!contactnumber.test(value)) {
            this.setState({ contactnumberError: "please enter a valid contact number", contactnumbervalid: 0 })
        }
        else {
            this.setState({ contactnumberError: '', contactnumbervalid: 1 })
        }
        this.setState({ contactnumber: value })

    }

    addressCheck(event){
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

    validateUser()
    {
        fetch('http://localhost:8080/api/v1/users/', {
            method: 'POST', 
            headers:authHeader(),
            body: JSON.stringify({name:this.state.firstname,email:this.state.email,password:this.state.password,phonenumber:this.state.contactnumber,address:this.state.address,role:'user'}),
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                if (data.status === true)
                {
                    alert(data.message)
                }
                else
                {
                    alert(data.message)
                }
            })
    }
    

    render() {
        var check=true;
        if((this.state.emailvalid === 1) && (this.state.passwordvalid === 1)  && (this.state.firstnamevalid === 1) && (this.state.addressvalid === 1) && (this.state.contactnumbervalid === 1))
        {
            check=false;
        }
        // console.log(this.validatecount);
        return (
            <div>
                <div className="page-header" style={{width:'80%',margin:'10px auto'}}>
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title text-primary">Add User</h4><br />
                                    <form className="forms-sample">
                                        <Form.Group>
                                            <Form.Control type="text" className="form-control" onChange={this.firstname.bind(this)} id="exampleInputUsername1" placeholder="Name" size="lg" />
                                            <p className="help-block text-danger">{this.state.firstnameError}</p>
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
                                            <Form.Control type="email" className="form-control" onChange={this.emailCheck.bind(this)} className="form-control" id="exampleInputEmail1" placeholder="Email" size="lg"/>
                                            <p className="help-block text-danger">{this.state.emailError}</p>
                                        </Form.Group><br />
                                       
                                        <Form.Group>
                                            <Form.Control type="password" className="form-control" onChange={this.passwordCheck.bind(this)} className="form-control" id="exampleInputPassword1" placeholder="Password" size="lg"/>
                                            <p className="help-block text-danger">{this.state.passwordError}</p>
                                        </Form.Group><br />
                                       
                                        <Form.Group>
                                            <Form.Control type="number" className="form-control" onChange={this.contactnumberCheck.bind(this)} id="exampleInputUsername1" placeholder="Contact Number" size="lg" />
                                            <p className="help-block text-danger">{this.state.contactnumberError}</p>
                                        </Form.Group><br />

                                        <Form.Group>

                                        </Form.Group>
                                       
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
export default Adduser;