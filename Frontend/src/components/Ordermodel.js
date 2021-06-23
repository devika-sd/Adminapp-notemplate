import { React, useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Form, Button, Row, Col } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import {connect} from 'react-redux';
import * as orderactions from '../action/order-action';

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '800px',
        backgroundColor: 'black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Ordermodel(props) {
    console.log(props.order);
    const classes = useStyles();
    var [modalStyle] = useState(getModalStyle);
    var [open, setOpen] = useState(false);
    let { orderid } = useParams();
    const [email, setemail] = useState(props.order.email);
    var paytype = props.order.paymentStatus ? "Online" : "COD"
    const [paymentType, setPayment] = useState(paytype);
    const [dateTime, setDateTime] = useState(props.order.orderDate);
    var addresses = props.order.address.houseNumber + "," + props.order.address.locality + "," + props.order.address.city + "," + props.order.address.state + ',' + props.order.address.country + ',' + props.order.address.pinCode;
    const [address, setAddress] = useState(addresses);
    // const [phonenumber, setContact] = useState(props.order.phonenumber);
    const [amount, setAmount] = useState(props.order.amount);
    const [bookname, setBookname] = useState('');
    const [status, setStatus] = useState(props.order.status);

    const [enable, setEnable] = useState(true)


    const handleopen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const checkClose = () => {
        handleClose();
    }

    const Update = async (e) => {
        let roleData = {status: status }
        console.log(roleData)
        setEnable(true)
        await props.updateorderbyid(props.order._id,roleData)
        await props.onGetorders("");
    }
    const Edit = (event) => {
        console.log('Edit')
        setEnable(false)
    }

    const onChangeRadio =(e)=>{
        console.log(e.target.value);
        setStatus(e.target.value);
    }

    var booklist = props.order.books.map((book, i) => {
        return (
            <>
                <Col sm={3}>
                    <Form.Control readOnly plaintext style={{
                        border: '1px solid lightgrey',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        outline: 'none'
                    }} type="text" value={book.quantity} placeholder="Enter Bookname">
                    </Form.Control>
                </Col>
                <Col sm={9}>
                    <Form.Control readOnly plaintext style={{
                        border: '1px solid lightgrey',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        outline: 'none'
                    }} type="text" value={book.isbn} placeholder="Enter Bookname">
                    </Form.Control>
                </Col>
            </>
        )
    })


    return (
        <div>
            <button className="btn" style={{ color: 'blue' }} onClick={handleopen}>{props.name.slice(props.name.length-6,props.name.length)}</button>
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <Card className="border border-muted" style={{
                        padding: '10px 15px',
                        margin: '15px auto',
                        boxSizing: 'border-box',
                        border: 'none',
                        width: '90%',
                        fontFamily: 'monospace',
                        display: 'block'
                    }}>
                        <Card.Body>
                            <i className="fas fa-times" style={{ float: 'right' }} onClick={checkClose}></i>
                            <Card.Title style={{
                                textAlign: 'center',
                                fontSize: '30px',
                                marginBottom: '10%'
                            }}>Order List </Card.Title>
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

                                            }} column sm={3}>email</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    textTransform: 'capitalize',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="text" value={email} placeholder="Enter Name" />
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

                                            }} column sm={3}>Payment Type</Form.Label>
                                            <Col sm={9}>

                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="email" value={paymentType} placeholder="Enter the type of payment" />
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

                                            }} column sm={3}>Date Time</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="text" value={dateTime} placeholder="Enter Ordered Date and Time" />
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
                                                }} type="text" value={address} placeholder="Enter Address" />
                                            </Col>

                                        </Form.Group>

                                        {/* <Form.Group as={Row} className="mb-3" >
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '18px'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={3}>Phone Number</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px'    ,
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="text" value={phonenumber} placeholder="Enter Contact Number">
                                                </Form.Control>
                                            </Col>
                                        </Form.Group> */}

                                        <Form.Group as={Row} className="mb-3" >
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '18px'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={3}>Amount</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="text" value={amount} placeholder="Enter Amount">
                                                </Form.Control>
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

                                            }} column sm={3}>Status</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control readOnly plaintext style={{
                                                    border: '1px solid lightgrey',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }} type="text" value={status} placeholder="Enter Status">
                                                </Form.Control>
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

                                            }} column sm={6}>Book Quantity</Form.Label>
                                            <Form.Label style={{
                                                // border: '1px solid lightgrey',
                                                padding: '10px 15px',
                                                textTransform: 'capitalize',
                                                fontSize: '18px',
                                                textAlign:'left'
                                                // borderRadius: '5px',
                                                // outline: 'none'

                                            }} column sm={6}>Book ISBN</Form.Label>
                                            {booklist}
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Col style={{ margin: 'auto' }} sm={6}>
                                                <Button variant="primary" block onClick={Edit}>EDIT</Button>
                                            </Col>
                                            {/* <Col sm={6}>
                                        <Button disabled variant="primary" block onClick={Update}>UPDATE</Button>
                                    </Col> */}
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

                                        }} column sm={3}>Status</Form.Label>
                                        <Col sm={9}>
                                            {/* <Form.Control type="text" value={status} placeholder="Enter Name" /> */}
                                            {/* ["new", "packed","shipped", "completed", "cancelled", "delayed"] */}
                                            <Form>
                                                    <div key='status' className="mb-3" onChange={onChangeRadio}>
                                                        <Form.Check
                                                            type='radio'
                                                            id='status'
                                                            name="group1"
                                                            label='new'
                                                            value='new'
                                                        />
                                                        <Form.Check
                                                            type='radio'
                                                            id='status'
                                                            name="group1"
                                                            label='Shipped'
                                                            value='shipped'
                                                        />
                                                        <Form.Check
                                                            type='radio'
                                                            id='status'
                                                            name="group1"
                                                            label='Packed'
                                                            value='packed'
                                                        />
                                                        <Form.Check
                                                            type='radio'
                                                            id='status'
                                                            name="group1"
                                                            label='Completed'
                                                            value='completed'
                                                        />
                                                        <Form.Check
                                                            type='radio'
                                                            id='status'
                                                            name="group1"
                                                            label='Delayed'
                                                            value='delayed'
                                                        />
                                                        <Form.Check
                                                            type='radio'
                                                            id='status'
                                                            name="group1"
                                                            label='Cancelled'
                                                            value='cancelled'
                                                        />
                                                    </div>
                                            </Form>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        {/* <Col sm={6}>
                                    <Button disabled variant="primary" block onClick={Edit}>EDIT</Button>
                                </Col> */}
                                        <Col style={{ margin: 'auto' }} sm={6}>
                                            <Button variant="primary" block onClick={Update}>UPDATE</Button>
                                        </Col>
                                    </Form.Group>

                                </Form>
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateorderbyid: (id,orderdata)=>dispatch(orderactions.updateorders(id,orderdata)),
        onGetorders: (filter)=>dispatch(orderactions.fetchorders(filter))
    }
}

export default connect(null, mapDispatchToProps)( Ordermodel);