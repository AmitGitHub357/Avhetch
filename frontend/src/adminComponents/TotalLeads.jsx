import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import Preloader from '../components/Preloader';

import { fetchLeadList, updateLeadData, fetchleadDetails, deleteLead } from '../actions/leadActions';
import { addCancelLeadData } from '../actions/cancellationLeadActions'




const TotalLeads = ({ match, history }) => {
    // const pageNumber = match.params.pageNumber || 1
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [leadListd, setLeadList] = useState([])
    const [leadData, setLeadData] = useState({
        _id: '',
        createdUser: '',
        assignedUser: '',
        consultant: '',
        enquiryDate: '',
        customer: '',
        contactNumber: '',
        project: {},
        leadScore: '',
        leadType: '',
        status: '',
        remarks: '',
        nextFollow: '',
        managerRemarks: '',
        booked: false,
        cancellation: false
    })
    const [leadType, setLeadType] = useState('')
    const [status, setStatus] = useState('')
    const [trigger, setTrigger] = useState(false)
    const [filterLeadType, setFilterLeadType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const dispatch = useDispatch();
    // const userLogin = useSelector((state) => state.userLogin)
    // const {userInfo: user } = userLogin

    const leadList = useSelector((state) => state.leadList)
    const { loading, error, leadInfo } = leadList

    const leadDetails = useSelector((state) => state.leadDetails)
    const { loading: loadingLead, error: errorLead, leadInfo: leadInfoLead } = leadDetails

    const updateLead = useSelector((state) => state.updateLead)
    const { loading: loadingUpdate, error: errorUpdate, success } = updateLead

    useEffect(() => {
        dispatch(fetchLeadList())
    }, [])

    useEffect(() => {
        setLeadData({})
        if (leadInfoLead && ((leadType !== leadInfoLead.leadType) || (status !== leadInfoLead.status))) {
            setLeadData(leadInfoLead)
            setLeadData(
                leadData._id = leadInfoLead._id,
                leadData.createdUser = leadInfoLead.createdUser,
                leadData.assignedUser = leadInfoLead.assignedUser,
                leadData.consultant = leadInfoLead.consultant,
                leadData.enquiryDate = leadInfoLead.enquiryDate,
                leadData.customer = leadInfoLead.customer,
                leadData.contactNumber = leadInfoLead.contactNumber,
                leadData.project = leadInfoLead.project,
                leadData.leadScore = leadInfoLead.leadScore,
                leadData.leadType = leadType,
                leadData.status = status,
                leadData.remarks = leadInfoLead.remarks,
                leadData.nextFollow = leadInfoLead.nextFollow,
                leadData.managerRemarks = leadInfoLead.managerRemarks,
                leadData.booked = leadInfoLead.booked,
                leadData.payment = leadInfoLead.payment,
                leadData.totalSqft = leadInfoLead.totalSqft,
            )

            if (trigger) {
                dispatch(updateLeadData(leadData))
                setTrigger(false)
            }
        } else {

            dispatch(fetchLeadList())
            console.log("20")
        }
    }, [dispatch, leadInfoLead])

    useEffect(() => {

        if (leadInfo && filterLeadType) {
            const a = leadInfo.filter((lead) => {
                return lead.leadType === filterLeadType
            })

            setLeadList(a)

            setTimeout(() => {
                console.log("1", leadListd)
            }, 1000)
        } else {
            setLeadList(leadInfo)
            setTimeout(() => {
                console.log("2", leadListd)
            }, 1000)
        }
    }, [filterLeadType, leadInfo])


    const updateLeadTypeHandler = (e, lead) => {
        e.preventDefault()
        setLeadType(e.target.value)
        dispatch(fetchleadDetails(lead._id))
        setTrigger(true)
        setStatus(lead.status)
    }

    const updateStatusHandler = (e, lead) => {
        e.preventDefault()
        setStatus(e.target.value)
        dispatch(fetchleadDetails(lead._id))
        setTrigger(true)
        setLeadType(lead.leadType)
    }

    const cancelLeadHandler = (e, lead) => {
        e.preventDefault()
        if (window.confirm('Are you sure')) {
            lead.cancellation = true
            dispatch(addCancelLeadData(lead))
            dispatch(deleteLead(lead._id))
            setTimeout(() => {
                dispatch(fetchLeadList())

            }, 1000)

        }

    }

    const handleEdit = (e, lead) => {
        e.preventDefault()
        history.push(`/leads/${lead._id}/edit`)
    }


    return (

        <>
            <Row>
                <Col>
                    <div className="fw-normal"><span>LeadType: </span>
                        <select defaultValue={filterLeadType} onChange={(e) => setFilterLeadType(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Hot">Hot</option>
                            <option value="Warm">Warm</option>
                            <option value="Cold">Cold</option>
                        </select>
                    </div>
                </Col>
                <Col>
                    <span>Date Range: </span>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e)} />
                    <span> to </span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e)} />
                </Col>
            </Row>
            <div>
                {loading ? <h1>Preloader</h1> : (
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
                                        <th className="border-bottom">1st Installment</th>
                                        <th className="border-bottom">2nd Installment</th>
                                        <th className="border-bottom">3rd Installment</th>
                                        <th className="border-bottom">Total sqft</th>
                                        <th className="border-bottom">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leadListd && leadListd.concat().reverse().map((lead, i) =>
                                        <tr key={i}>
                                            <td>
                                                <span className="fw-normal">
                                                    {leadInfo.length - i}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {new Date(`${lead.enquiryDate}`).toISOString().split('T')[0]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {lead.customer}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {lead.contactNumber}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {lead.project ? lead.project.subProject : ''}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {lead.leadScore}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    <select defaultValue={lead.leadType} onChange={(e) => updateLeadTypeHandler(e, lead)}>
                                                        <option value="Hot">Hot</option>
                                                        <option value="Warm">Warm</option>
                                                        <option value="Cold">Cold</option>
                                                    </select>

                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    <select defaultValue={lead.status} onChange={(e) => updateStatusHandler(e, lead)}>
                                                        <option value="Yet to Visit">Yet to Visit</option>
                                                        <option value="Visited">Visited</option>
                                                        <option value="Visit Confirmed">Visit Confirmed</option>
                                                        <option value="Detail Shared">Detail Shared</option>
                                                        <option value="Lost">Lost</option>
                                                        <option value="Booked">Booked</option>
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
                                                <span className="fw-normal">
                                                    {lead.payment.firstInstallment}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {lead.payment.secondInstallment}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {lead.payment.thirdInstallment}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {lead.totalSqft}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    {(lead.payment.firstInstallment) + (lead.payment.secondInstallment) + (lead.payment.thirdInstallment)}
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
                            </Dropdown.Item> */}
                                                        {/* <Dropdown.Item><Link to={`/leads/${lead._id}/edit`}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit</Link>
                            </Dropdown.Item> */}
                                                        <Dropdown.Item onClick={(e) => handleEdit(e, lead)}>
                                                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                                                        </Dropdown.Item>
                                                        {/* <Dropdown.Item className="text-danger">
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" onClick = {(e)=>cancelLeadHandler(e, lead)}/> Remove
                            </Dropdown.Item> */}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )}
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
                    </small>  */}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>

    )
}

export default TotalLeads
