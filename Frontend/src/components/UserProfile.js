import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import authHeader from '../services/auth-header'
import {useParams} from "react-router-dom"

function UserProfile() {

    let { id } = useParams();
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setContact] = useState('');

    const [enable, setEnable] = useState(true)

    const [addressError, setAddressError] = useState(true)
    const [nameError, setNameError] = useState(true)
    const [emailError, setEmailError] = useState(true)
    const [passwordError, setPasswordError] = useState(true)
    const [contactError, setContactError] = useState(true)


    useEffect(() => {
        fetch('http://localhost:8080/api/v1/users?_id='+id,
            {
                method: 'GET',
                headers: authHeader()
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                // this.setState({ todolist: data })
                console.log(data.data)
                setName(data.data[0].name)
                setEmail(data.data[0].email)
                setPassword(data.data[0].password)
                setContact(data.data[0].phonenumber)
                setAddress(data.data[0].address)
                // setRole(data.data[0].role)
            });
    }, [])
    // methods for Events
    const onAddressChange = (event) => {
        var addressValue = (event.target.value);
        const expression = new RegExp('[a-zA-Z0-9\\s]');
        // console.log(nameValue);
        if (!(expression.test(addressValue))) {
            setAddress(addressValue)
            setAddressError(false)
        }
        else {
            setAddress(addressValue)
            setAddressError(true)
        }
    }
    const onNameChange = (event) => {
        var nameValue = (event.target.value)
        const expression = new RegExp('^[a-zA-Z]{1}[a-zA-Z0-9\\s]{3,30}$');
        // console.log(nameValue);
        if (!(expression.test(nameValue))) {
            setName(nameValue)
            setNameError(false)
        }
        else {
            setName(nameValue)
            setNameError(true)
        }
    }
    const onEmailChange = (event) => {
        var emailValue = (event.target.value);
        const expression = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
        // console.log(nameValue);
        if (!(expression.test(emailValue))) {
            setEmail(emailValue)
            setEmailError(false)
        }
        else {
            setEmail(emailValue)
            setEmailError(true)
        }
    }
    const onPasswordChange = (event) => {
        var contactValue = (event.target.value);
        const expression = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$');
        // console.log(nameValue);
        if (!(expression.test(contactValue))) {
            setPassword(contactValue)
            setPasswordError(false)
        }
        else {
            setPassword(contactValue)
            setPasswordError(true)
        }
    }

    const onContactChange = (event) => {
        var contactValue = (event.target.value);
        const expression = new RegExp('^[0-9]{10}$');
        // console.log(nameValue);
        if (!(expression.test(contactValue))) {
            setContact(contactValue)
            setContactError(false)
        }
        else {
            setContact(contactValue)
            setContactError(true)
        }
    }

    const Update = async (event) => {
        let roleData = { name, email, password, address, phonenumber }
        console.log(roleData)
        await fetch('http://localhost:8080/api/v1/users/60c999bc8b055f1ff4e5470a',
            {
                method: 'PUT',
                headers: authHeader(),
                body: JSON.stringify(roleData)
            })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    // this.setState({ message: "Successfully inserted" })
                    console.log("Successfully inserted")
                }
            })

        setEnable(true)
        // FetchCalls.registerUser(roleData)
        // event.preventDefault()
    }
    const Edit = (event) => {
        console.log('Edit')
        setEnable(false)
        // FetchCalls.registerUser(roleData)
        // event.preventDefault()
    }
    return (
        <>
            <Card className="border border-muted" style={{
                padding: '10px 15px',
                margin: '60px auto',
                boxSizing: 'border-box',
                border: 'none',
                width: '50%',
                fontFamily: 'monospace',
                display: 'block'
            }}>
                <Card.Body>
                    <Card.Title style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        marginBottom: '10%'
                    }}>User Profile</Card.Title>
                    <Card.Text>

                        {/* Disabled */}
                        {enable &&
                            <Form>
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label style={{
                                        // border: '1px solid lightgrey',
                                        padding: '10px 15px',
                                        textTransform: 'capitalize',
                                        fontSize: '18px'
                                        // borderRadius: '5px',
                                        // outline: 'none'

                                    }} column sm={3}>Name</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control readOnly plaintext style={{
                                            border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            textTransform: 'capitalize',
                                            borderRadius: '5px',
                                            outline: 'none'
                                        }} type="text" value={name} onChange={onNameChange} placeholder="Enter Name" />
                                    </Col>

                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label style={{
                                        // border: '1px solid lightgrey',
                                        padding: '10px 15px',
                                        textTransform: 'capitalize',
                                        fontSize: '18px'
                                        // borderRadius: '5px',
                                        // outline: 'none'

                                    }} column sm={3}>Email</Form.Label>
                                    <Col sm={9}>

                                        <Form.Control readOnly plaintext style={{
                                            border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            outline: 'none'
                                        }} type="email" value={email} onChange={onEmailChange} placeholder="Enter Email" />
                                    </Col>

                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label style={{
                                        // border: '1px solid lightgrey',
                                        padding: '10px 15px',
                                        textTransform: 'capitalize',
                                        fontSize: '18px'
                                        // borderRadius: '5px',
                                        // outline: 'none'

                                    }} column sm={3}>Password</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control readOnly plaintext style={{
                                            border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            outline: 'none'
                                        }} type="text" value={password} onChange={onPasswordChange} placeholder="Enter Password" />
                                    </Col>

                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label style={{
                                        // border: '1px solid lightgrey',
                                        padding: '10px 15px',
                                        textTransform: 'capitalize',
                                        fontSize: '18px'
                                        // borderRadius: '5px',
                                        // outline: 'none'

                                    }} column sm={3}>Contact No.</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control readOnly plaintext style={{
                                            border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            outline: 'none'
                                        }} type="text" value={phonenumber} onChange={onContactChange} placeholder="Enter Contact Number" />
                                    </Col>

                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label style={{
                                        // border: '1px solid lightgrey',
                                        padding: '10px 15px',
                                        textTransform: 'capitalize',
                                        fontSize: '18px'
                                        // borderRadius: '5px',
                                        // outline: 'none'

                                    }} column sm={3}>Address</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control readOnly plaintext style={{
                                            border: '1px solid lightgrey',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            outline: 'none'
                                        }} type="text" value={address} onChange={onAddressChange}>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col sm={6}>
                                        <Button variant="primary" block onClick={Edit}>EDIT</Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button disabled variant="primary" block onClick={Update}>UPDATE</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        }

                        {/* Enabled */}
                        {!enable && <Form>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label style={{
                                    // border: '1px solid lightgrey',
                                    padding: '10px 15px',
                                    textTransform: 'capitalize',
                                    fontSize: '18px'
                                    // borderRadius: '5px',
                                    // outline: 'none'

                                }} column sm={3}>Name</Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" value={name} onChange={onNameChange} placeholder="Enter Name" />
                                </Col>
                                {!nameError && <Form.Text className="text-danger">
                                    Please Enter Valid Name (paddu)
                                </Form.Text>}
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label style={{
                                    // border: '1px solid lightgrey',
                                    padding: '10px 15px',
                                    textTransform: 'capitalize',
                                    fontSize: '18px'
                                    // borderRadius: '5px',
                                    // outline: 'none'

                                }} column sm={3}>Email</Form.Label>
                                <Col sm={9}>

                                    <Form.Control type="email" value={email} onChange={onEmailChange} placeholder="Enter Email" />
                                </Col>
                                {!emailError && <Form.Text className="text-danger">
                                    Please Enter Valid Email (paddu@gmail.com)
                                </Form.Text>}
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label style={{
                                    // border: '1px solid lightgrey',
                                    padding: '10px 15px',
                                    textTransform: 'capitalize',
                                    fontSize: '18px'
                                    // borderRadius: '5px',
                                    // outline: 'none'

                                }} column sm={3}>Password</Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" value={password} onChange={onPasswordChange} placeholder="Enter Password" />
                                </Col>
                                {!passwordError && <Form.Text className="text-danger">
                                    Please Enter Valid Password (paddu@0y)
                                </Form.Text>}
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label style={{
                                    // border: '1px solid lightgrey',
                                    padding: '10px 15px',
                                    textTransform: 'capitalize',
                                    fontSize: '18px'
                                    // borderRadius: '5px',
                                    // outline: 'none'

                                }} column sm={3}>Contact No.</Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" value={phonenumber} onChange={onContactChange} placeholder="Enter Contact Number" />
                                </Col>
                                {!contactError && <Form.Text className="text-danger">
                                    Please Enter Valid Contact number (9284556633)
                                </Form.Text>}
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label style={{
                                    // border: '1px solid lightgrey',
                                    padding: '10px 15px',
                                    textTransform: 'capitalize',
                                    fontSize: '18px'
                                    // borderRadius: '5px',
                                    // outline: 'none'

                                }} column sm={3}>Address</Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" value={address} onChange={onAddressChange}>
                                    </Form.Control>
                                </Col>
                                {!addressError && <Form.Text className="text-danger">
                                    Please provide a valid Address
                                </Form.Text>}
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={6}>
                                    <Button disabled variant="primary" block onClick={Edit}>EDIT</Button>
                                </Col>
                                <Col sm={6}>
                                    <Button variant="primary" block onClick={Update}>UPDATE</Button>
                                </Col>
                            </Form.Group>

                        </Form>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
export default UserProfile