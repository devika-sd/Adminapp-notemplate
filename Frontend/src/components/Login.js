import React, { Component } from 'react';
import authHeader from '../services/auth-header';



class Login extends Component {
    constructor() {
        super();
        this.state = { email: '', password: '', emailError: '', passwordError: '', emailvalid: 0, passwordvalid: 0 };
    }
 
    emailCheck(event) {
        let value = event.target.value;
        console.log(value);
        var mail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",);
        if (!mail.test(value)) {
            this.setState({ emailError: "please enter valid mail", emailvalid: 0 })
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
    login() {
        fetch('http://localhost:8080/api/v1/users/login', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({email:this.state.email,password:this.state.password}),
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);               
            if (data.status === true)
                {
                    localStorage.setItem('token', data.token);
                    this.props.history.push('/dashboard');
                }
                else
                {
                    alert(data.message);
                }
            })
    }
    
    render() {
        var check = true;
        if ((this.state.emailvalid === 1) && (this.state.passwordvalid === 1)) {
            check = false;
        }
        return (
            <>
                <div className="userform">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <p>Login Form</p>
                        </div>
                        <div className="row">
                            <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="userform-form">
                                    <form>
                                        <div className="control-group">
                                            <input type="email" className="form-control" onChange={this.emailCheck.bind(this)} id="email" placeholder="Email" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger">{this.state.emailError}</p>
                                        </div>
                                        <div className="control-group">
                                            <input type="password" className="form-control" onChange={this.passwordCheck.bind(this)} id="password" placeholder="Password" required="required" data-validation-required-message="Please enter your email" />
                                            <p className="help-block text-danger" >{this.state.passwordError}</p>
                                        </div>

                                        <div>
                                            <button className="btn btn-primary" type="button" onClick={this.login.bind(this)} disabled={check}>Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;