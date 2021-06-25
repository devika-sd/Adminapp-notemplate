import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Table } from 'react-bootstrap'
import Ordermodel from './Ordermodel';
import { connect } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination'
import * as orderactions from '../action/order-action';

function Orderlist(props) {

    // this.state = { users: [], word: '', active: 1, maxpage: 1, limit: 5, pageno: [1, 2, 3], open: false }
    const [limit, setLimit] = useState(5)
    // const [maxpage, setMaxpage] = useState(1)
    const [pageno, setPageno] = useState([1, 2, 3])
    const [active, setActive] = useState(1)


    useEffect(async () => {
        // await props.onGetorders("page=" + active + "&limit=" + limit);
        await getOrders()

    }, [active])

    async function updatepagination(current) {
        console.log("current:****************************" + current);
        var max = 1;
        max = (props.totalorders / limit)
        console.log("*******************************Max******************" + max);
        console.log(props.totalorders);

        // setMaxpage(max)
        // console.log(maxpage);
        if (current === 'initial') {
            let temparrr = [1, 2, 3];
            // await this.setState({ pageno: temparrr, active: 1 });
            await setPageno(temparrr)
            await setActive(1)
        }
        if (current === 'final') {
            let temp = max > Math.floor(props.totalorders / limit) ? Math.floor(max) + 1 : Math.floor(max);
            // let temp = max

            let temparrr = [temp - 2, temp - 1, temp];
            // await this.setState({ pageno: temparrr, active: temp });
            await setPageno(temparrr)
            await setActive(temp)
        }
        if (pageno[2] < max) {
            if (current === "next") {
                var temparr = [...pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] + 1;
                }
                let tempactive = temparr[0];
                // await this.setState({ pageno: temparr, active: tempactive });
                await setPageno(temparr)
                await setActive(tempactive)
            }
        }
        if (current === "prev") {
            if (pageno[0] !== 1) {
                var temparr = [...pageno];
                for (let i = 0; i < temparr.length; i++) {
                    temparr[i] = temparr[i] - 1;
                }
                let tempactive = temparr[0];
                // await this.setState({ pageno: temparr, active: tempactive });
                await setPageno(temparr)
                await setActive(tempactive)
            }
        }
    }
    
    async function changePage(pageNo) {
        await setActive(pageNo)
        console.log("****************************" + pageNo);
    }
    async function getOrders() {
        await props.onGetorders("page=" + active + "&limit=" + limit);
    }

    const handleSelect = async (e) => {
        console.log("&&&&&&&&&&&&&&&&&&&&" + e);
        if (e === 'all') {
            await props.onGetorders("");
        }
        else {
            await props.onGetorders("status=" + e);
        }
    }


    let orderList1 = props.orders.map((data, i) => {
        console.log(data.paymentStatus);
        return (
            <tr key={i}>
                {/* <td><Link to={'/operations/' + data.id}>{data.id}</Link></td> */}
                <td><a href='#'><Ordermodel name={data._id} order={data}></Ordermodel></a></td>
                <td> {data.email} </td>
                <td> {data.paymentStatus ? <span>Online</span> : <span>COD</span>} </td>
                <td> {data.orderDate} </td>
                <td> {data.status} </td>
            </tr>
        )
    })

    let items = pageno.map((no,i) => {
        return (
            <Pagination.Item key={i} onClick={() => changePage(no)} active={no === active}>
                {no}
            </Pagination.Item>
        )
    })
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid" style={{ height: "40px" }}>
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
            <div>
                <Pagination style={{ display: 'flex', width: '220px', margin: 'auto' }}>
                    <Pagination.First onClick={() => updatepagination('initial')} />
                    <Pagination.Prev onClick={() => updatepagination('prev')} />
                    {items}
                    <Pagination.Next onClick={() => updatepagination('next')} />
                    <Pagination.Last onClick={() => updatepagination('final')} />
                </Pagination>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        orders: state.orderReducer.orders,
        totalorders: state.orderReducer.totalorders

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetorders: (filter) => dispatch(orderactions.fetchorders(filter)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orderlist);