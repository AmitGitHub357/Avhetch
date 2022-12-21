import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";

import { consultantsUnderManager, updateUser } from '../actions/userActions'
import { deleteUser } from '../actions/userActions';
import Preloader from '../components/Preloader';



const SetMilestone = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bookingNumber, setBookingNumber] = useState(0)
    const [ userDetails, setUserDetails] = useState({})

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo: user } = userLogin

    const fetchConsultants = useSelector((state) => state.fetchConsultants)
    const { loading, error, consultants: users } = fetchConsultants

    // const fetchConsultants = useSelector((state) => state.fetchConsultants)
    // const { loading, error, consultants: users } = fetchConsultants

    const userUpdate = useSelector((state) => state.up)

    

    useEffect(() => {
        if(user && user.role === 'Manager'){
        dispatch(consultantsUnderManager(user._id))
        }else{
            history.push('/login')
        }
    }, [dispatch, user])

    useEffect(() => {
        if(userDetails.name){
        dispatch(updateUser(userDetails))
        }
    },[dispatch, userDetails])


    const bookingHandler = (e, user) => {
        e.preventDefault()
        user.setMilestone ={
            bookings : bookingNumber,
            leads : bookingNumber * 6,
            siteVisits : bookingNumber * 4
        }
        setUserDetails(user)
        console.log(userDetails)
    }
    
    return (
        <div>
            { loading ? <Preloader /> : (
                <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                    <thead>
                    <tr>
                        <th className="border-bottom">Serial No.</th>
                        <th className="border-bottom">Employee Code</th>
                        <th className="border-bottom">Name</th>
                        <th className="border-bottom">Email Id</th>
                        <th className="border-bottom">Mobile no.</th> 
                        <th className="border-bottom">Bookings Number<br/>(per month)</th>  
                        {/* <th className="border-bottom">Leads<br/>(per month)</th>  
                        <th className="border-bottom">Site Visits<br/>(per month)</th>             */}
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map((user, i) => 
                    <tr key={i}>
                    <td>
                        <span className="fw-normal">
                        {i+1}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {user.empCode}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {user.name}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {user.email}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {user.mobile}
                        </span>
                    </td>

                    <td>
                        <span className="fw-normal">
                        <input
                            type="number"
                            defaultValue={user.setMilestone.bookings}
                            onChange = { (e) => setBookingNumber(e.target.value)}
                        />
                        </span>
                    </td>

                    <td>
                        <div className="mt-3">
                            <Button variant="primary" type="submit" onClick = {(e) => bookingHandler(e,user)}>Save</Button>
                        </div>
                    </td>
                    {/* <td>
                        <span className="fw-normal">
                        {user.setMilestone.bookings * 6}
                        </span>
                    </td>

                    <td>
                        <span className="fw-normal">
                        {user.setMilestone.bookings * 4}
                        </span>
                    </td> */}
                    
                    {/* <td>
                        <Form.Control required type="text" placeholder="Enter your name" value={}/>
                    </td> */}
                    {/* <td>
                        <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm">
                            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                            <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item>
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick= {()=> deleteHandler(user._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </td> */}
                    </tr>
                    )}
                    </tbody>
                </Table>
                {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                    <Pagination className="mb-2 mb-lg-0">
                        <Pagination.Prev>
                        Previous
                        </Pagination.Prev>
                        <Pagination.Item active>1</Pagination.Item>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Item>4</Pagination.Item>
                        <Pagination.Item>5</Pagination.Item>
                        <Pagination.Next>
                        Next
                        </Pagination.Next>
                    </Pagination>
                    </Nav>
                    {/* <small className="fw-bold">
                    Showing <b>{totalTransactions}</b> out of <b>25</b> entries
                    </small> 
                </Card.Footer> */}
                </Card.Body>
            </Card>
            )}
        </div>
    )
}

export default SetMilestone
