import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faCommentsDollar, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";

import { fetchUserList, updateUser } from '../actions/userActions'
import { deleteUser } from '../actions/userActions';
import Preloader from '../components/Preloader';



const Promotion = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [userData, setUserData] = useState({})

    const dispatch = useDispatch();

    // const userLogin = useSelector((state) => state.userLogin)
    // const {userInfo: user } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const deleteUserProfile = useSelector((state) => state.deleteUserProfile)
    const { loading: deleteLoading, error:deleteError, success } = deleteUserProfile

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
       
      } else {
        history.push('/login')
      }
    }, [user, history])

    useEffect(() => {
        dispatch(fetchUserList())
    }, [dispatch, success])

    useEffect(() => {
        if(userData){
        dispatch(updateUser(userData))
        }
    }, [userData])

    const updateHandler = (e,user) =>{
        console.log(e.target.value)
        setRole(e.target.value)
        user.role = e.target.value
        setUserData(user)
        console.log(userData)     
    }

    const deleteHandler = (id) =>{
        if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
        }
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
                        <th className="border-bottom">Role</th>            
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
                        <select defaultValue={user.role} onChange={(e) =>updateHandler(e, user)}>
                            <option value="">Select</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="cp manager">CP Manager</option>
                            <option value="asm">ASM</option>
                            <option value="TeamLead">TeamLead</option>
                            <option value="Consultant">Consultant</option>
                            <option value="channel patner">Channel Patner</option>
                        </select>
                        </span>
                    </td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm">
                            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* <Dropdown.Item>
                            <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item>
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item> */}
                            <Dropdown.Item className="text-danger" onClick= {()=> deleteHandler(user._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    </tr>
                    )}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                    {/* <Pagination className="mb-2 mb-lg-0">
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
                    </Pagination> */}
                    </Nav>
                    {/* <small className="fw-bold">
                    Showing <b>{totalTransactions}</b> out of <b>25</b> entries
                    </small> */}
                </Card.Footer>
                </Card.Body>
            </Card>
            )}
        </div>
    )
}

export default Promotion
