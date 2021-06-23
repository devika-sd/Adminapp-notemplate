import React, { Component } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../action/user-action';

class Adduser extends Component {
    constructor() {
        super();
        this.state = {
            name: '', email: '', password: '', phonenumber: '', housenumber:'', locality:'', city:'', country:'',  pincode:'', nameError: '', emailError: '', passwordError: '',
            phonenumberError: '', namevalid: 0, emailvalid: 0, passwordvalid: 0, phonenumbervalid: 0,
            role: '', roleError: '', rolevalid: 0, housenumbervalid : 0, localityvalid : 0, cityvalid :0, countryvalid : 0, pincodevalid : 0,
            state1 :["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
            "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
            "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
            "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"], select:'', selectvalid : 0
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


    roleCheck(event) {
        let value = event.target.value
        if (value === 0) {
            this.setState({ roleError: ' Please Select Role', rolevalid: 0 })
        }

        else {
            this.setState({ role: value, rolevalid: 1 })
        }
    }

    housenumberCheck(event){
        let value = event.target.value
        const housenumber = new RegExp("^[0-9]{1,4}$");
        if(housenumber.test(value)){
            this.setState({ housenumber: value, housenumbervalid: 1 })
        }
    }

    localityCheck(event){
        let value = event.target.value
        const locality = new RegExp('[a-zA-Z\s]{5,30}')
        if(locality.test(value)){
            this.setState({ locality: value, localityvalid: 1 })
        }
    }
    
    citycheck(event){
        let value = event.target.value
        const city = new RegExp('[a-zA-Z\s]{5,30}')
        if(city.test(value)){
            this.setState({ city: value, cityvalid: 1 })
        }
    }

    countryCheck(event) {
        let value = event.target.value
        if (value === 0) {
            this.setState({ country: value, countryvalid: 0 })
        }

        else {
            this.setState({ country: value, countryvalid: 1 })
        }
    }
    
    stateCheck(event){
        let value = event.target.value
        this.setState({ select: value, selectvalid :1 });
    }

    pincodeCheck(event){
        let value = event.target.value
        const pincode = new RegExp("^[0-9]{6}$");
        if (pincode.test(value)) {
            this.setState({ pincode: value, pincodevalid :1 })
        }
    }

    async validateUser() {
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
        let user = { name: this.state.name, email: this.state.email, password: this.state.password, phone: this.state.phonenumber,isAdmin: this.state.role,addresses:[{houseNumber:this.state.housenumber,city:this.state.city,locality:this.state.locality,country:this.state.country,state:this.state.select,pinCode:this.state.pincode}] };
        console.log(user)
        await this.props.onAddUser(user);
        alert(this.props.message);
    }


    render() {
        var check = true;
        if ((this.state.emailvalid === 1) && (this.state.passwordvalid === 1) && (this.state.namevalid === 1) && (this.state.phonenumbervalid === 1) && (this.state.rolevalid === 1) && (this.state.housenumbervalid === 1) && (this.state.localityvalid === 1) && (this.state.cityvalid === 1) && (this.state.countryvalid === 1) && (this.state.selectvalid === 1) && (this.state.pincodevalid === 1)) {
            check = false;
        }
        console.log({ name: this.state.name, email: this.state.email, password: this.state.password, phone: this.state.phonenumber,isAdmin: this.state.role,addresses:[{houseNumber:this.state.housenumber,city:this.state.city,locality:this.state.locality,country:this.state.country,state:this.state.select,pinCode:this.state.pincode}] });
        return (
            <div>
                <div className="page-header" style={{ width: '50%', margin: '30px auto' }}>
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
                                                <option value ={true} >Admin</option>
                                                <option value={false}>User</option>
                                            </Form.Control>
                                            <p className="help-block text-danger">{this.state.roleError}</p>
                                        </Form.Group><br />

                                        <Form.Label>Address</Form.Label>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridHouseNumber">
                                                <Form.Control type="number" className="form-control" onChange={this.housenumberCheck.bind(this)} id="exampleInputUsername1" placeholder="HouseNumber" size="lg" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridLocality">
                                                <Form.Control type="text" className="form-control" onChange={this.localityCheck.bind(this)} placeholder="Locality" size="lg" />  
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Control as="select" onChange={this.stateCheck.bind(this)} custom size="lg">
                                                    <option>Select State</option>
                                                    {this.state.state1.map(data =>(
                                                        <option title={data}>{data}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row><br />

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Control type="text" className="form-control" onChange={this.citycheck.bind(this)} id="exampleInputUsername1" placeholder="City" size="lg" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridCountry">
                                                <Form.Control as="select" onChange={this.countryCheck.bind(this)} custom size="lg">
                                                    <option value="0">Select Country</option>
                                                    <option value="India">India</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Control type="number" className="form-control" onChange= {this.pincodeCheck.bind(this)} id="exampleInputUsername1" placeholder="PinCode" size="lg" />
                                            </Form.Group>
                                        </Form.Row><br />
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
        message: state.userReducer.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUser: (user) => dispatch(actions.addusers(user))
    }
}

// export default AddWorkout;
export default connect(mapStateToProps, mapDispatchToProps)(Adduser);