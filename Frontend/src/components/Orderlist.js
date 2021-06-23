import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Table } from 'react-bootstrap'
import Ordermodel from './Ordermodel';
import {connect} from 'react-redux';
import Pagination from 'react-bootstrap/Pagination'
import * as orderactions from '../action/order-action';

function Orderlist(props) {

    useEffect(async() => {
        await props.onGetorders("");
    }, [])


    const handleSelect = async(e) => {
        console.log("&&&&&&&&&&&&&&&&&&&&"+e);
        if(e === 'all')
        {
            await props.onGetorders("");
        }
        else
        {
            await props.onGetorders("status="+e);
        }
    }

    let orderList1 = props.orders.map((data, i) => {
        console.log(data.paymentStatus);
        return (
            <tr key={i}>
                {/* <td><Link to={'/operations/' + data.id}>{data.id}</Link></td> */}
                <td><a href='#'><Ordermodel name={data._id} order={data}></Ordermodel></a></td>
                <td> {data.email} </td>
                <td> {data.paymentStatus?<span>Online</span>:<span>COD</span>} </td>
                <td> {data.orderDate} </td>
                <td> {data.status} </td>
            </tr>
        )
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid" style={{height:"40px"}}>
                    <a className="navbar-brand" href="#">Order List</a>
                    <DropdownButton
                    alignRight
                    title="Orders"
                    id="dropdown-menu-align-right"
                    style={{
                        width: "50px"
                    }}
                    className="m-5"
                    onSelect={handleSelect}
                >
                    <Dropdown.Item eventKey="all">All Order</Dropdown.Item>
                    <Dropdown.Item eventKey="new">New Order</Dropdown.Item>
                    <Dropdown.Item eventKey="packed">Packed Order</Dropdown.Item>
                    <Dropdown.Item eventKey="shipped">Shipped Order</Dropdown.Item>
                    <Dropdown.Item eventKey="completed">Completed Order</Dropdown.Item>
                    <Dropdown.Item eventKey="delayed">Delayed Order</Dropdown.Item>
                    <Dropdown.Item eventKey="cancelled">Cancelled Order</Dropdown.Item>
                </DropdownButton>
                </div>
            </nav>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Email</th>
                        <th>Payment Type</th>
                        <th>Date Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList1}
                </tbody>
            </Table>
        </>
    )
}
const mapStateToProps  =(state)=>{
    return {
     orders:state.orderReducer.orders,
     totalrecord:state.orderReducer.totalorders         
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetorders: (filter)=>dispatch(orderactions.fetchorders(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Orderlist);