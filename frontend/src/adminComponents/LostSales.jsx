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

import { fetchLeadList, updateLeadData, fetchleadDetails} from '../actions/leadActions';
import Preloader from '../components/Preloader';



const LostSales = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [leadData, setLeadData] = useState({})
    const [leadType, setLeadType] = useState('')
    const [status, setStatus] = useState('')

    const dispatch = useDispatch();

    // const userLogin = useSelector((state) => state.userLogin)
    // const {userInfo: user } = userLogin

    const leadList = useSelector((state) => state.leadList)
    const { loading, error, leadInfo } = leadList

    const leadDetails = useSelector((state) => state.leadDetails)
    const { loading: loadingLead, error: errorLead, leadInfo: leadInfoLead } = leadDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
       
      } else {
        history.push('/login')
      }
    }, [user, history])



    useEffect(() => {
        dispatch(fetchLeadList())
        // if(leadInfoLead && ((leadInfoLead.leadType !== leadType) || (leadInfoLead.status !== status))){
        //     setLeadData(leadInfoLead)
        //     setLeadData(leadData.leadType = leadType)
        //     setLeadData(leadData.status = status)
        //     dispatch(updateLeadData(leadData))
        // }
    }, [dispatch, leadInfoLead, status, leadData])


    const updateLeadTypeHandler = (e, id) => {
        setLeadType(e.target.value)
        dispatch(fetchleadDetails(id))
        // if(leadInfoLead && ((leadInfoLead.leadType !== leadType) || (leadInfoLead.status !== status))){
        //     setLeadData(leadInfoLead)
        //     setLeadData(leadData.leadType = leadType)
        //     setLeadData(leadData.status = status)
        //     dispatch(updateLeadData(leadData))
        // }
    }

    const updateStatusHandler = (e, id) => {
        setStatus(e.target.value)
        dispatch(fetchleadDetails(id))
        // if(leadInfoLead && ((leadInfoLead.leadType !== leadType) || (leadInfoLead.status !== status))){
        //     setLeadData(leadInfoLead)
        //     setLeadData(leadData.leadType = leadType)
        //     setLeadData(leadData.status = status)
        //     dispatch(updateLeadData(leadData))
        // }
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
                        <th className="border-bottom">Enquiry date</th>
                        <th className="border-bottom">Customer</th>
                        <th className="border-bottom">Contact</th>
                        <th className="border-bottom">Project</th> 
                        <th className="border-bottom">Lead Score</th>
                        <th className="border-bottom">Lead Type</th>
                        <th className="border-bottom">Status</th>
                        <th className="border-bottom">Remarks</th>
                        <th className="border-bottom">Next Follow Up</th>            
                        <th className="border-bottom">Manager Remarks</th> 
                    </tr>
                    </thead>
                    <tbody>
                    {leadInfo && leadInfo.map((lead, i) => 
                    (lead.status === 'Lost') && (
                    <tr key={i}>
                    <td>
                        <span className="fw-normal">
                        {i+1}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {new Date(`${lead.enquiryDate}`).toISOString().split('T')[0]}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {lead.customerName}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {lead.contactNumber}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {lead.project.subProject}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {lead.leadScore}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        <select defaultValue={lead.leadType}  onChange={(e) => updateLeadTypeHandler(e, lead._id)}>
                            <option value="Hot">Hot</option>
                            <option value="Warm">Warm</option>
                            <option value="Hot">Cold</option>
                        </select>
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                            <select defaultValue={lead.status} onChange={(e) => updateStatusHandler(e, lead._id)}>
                                <option value="Yet to Visit">Yet to Visit</option>
                                <option value="Visited">Visited</option>
                                <option value="Visit Confirmed">Visit Confirmed</option>
                                <option value="Detail Shared">Detail Shared</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {lead.remarks}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {new Date(`${lead.nextFollow}`).toISOString().split('T')[0]}
                        </span>
                    </td>
                    <td>
                        <span className="fw-normal">
                        {lead.managerRemarks}
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
                            <Dropdown.Item>
                            <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item>
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger">
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </td>
                    </tr>
                    ))}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
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
                    </small> */}
                </Card.Footer>
                </Card.Body>
            </Card>
            )}
        </div>
    )
}

export default LostSales
