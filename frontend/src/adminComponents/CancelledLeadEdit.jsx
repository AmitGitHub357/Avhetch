import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import Preloader from "../components/Preloader";



import { projects } from "../actions/projectActions";
import { deleteCancelledLead, updateCancelledLeadData, fetchCancelledLeadDetails } from "../actions/cancellationLeadActions";
import { consultantList } from "../actions/userActions";
import { addLeadData } from "../actions/leadActions";



export default ({match, history}) => {
    const cancelledLeadId = match.params.id

    const [createdUser, setCreatedUser] = useState('')
    const [assignedConsultant, setAssignedConsultant] = useState('')
    const [consultant, setConsultant] = useState('')
    const [enquiryDate, setEnquiryDate] = useState('')
    const [customer, setCustomer] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [mainProject, setMainProject] = useState('')
    const [subProject, setSubProject] = useState('')
    const [projectId, setProjectId] = useState('')
    const [leadScore, setLeadScore] = useState('')
    const [leadType, setLeadType] = useState('')
    const [status, setStatus] = useState('')
    const [remarks, setRemarks] = useState('')
    const [nextFollow, setNextFollow] = useState('')
    const [managerRemarks, setManagerRemarks] = useState('')
    var [firstInstallment, setFirstInstallment] = useState(0)
    var [secondInstallment, setSecondInstallment] = useState(0)
    var [thirdInstallment, setThirdInstallment] = useState(0)
    const [totalSqft, setTotalSqft] = useState(0)
    const [index, setIndex] = useState(0)
    const [refundStatus, setRefundStatus] = useState('no')
    

    const dispatch = useDispatch()

    const cancelledLeadDetails = useSelector((state) => state.cancelledLeadDetails)
    const { loading, error, cancelledLeadInfo } = cancelledLeadDetails

    const updateCancelLead = useSelector((state) => state.updateCancelLead)
    const { loading: loadingUpdate, error: errorUpdate , success: successUpdate } = updateCancelLead

    const Projects = useSelector((state) => state.fetchProjects)
    const { loading: loadingProject, error: errorProject , projectInfo } = Projects

    const fetchConsultants = useSelector((state) => state.fetchConsultants)
    const { loading: loadingConsultants, error: errorConsultants, consultants: consultantsList } = fetchConsultants

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
       
      } else {
        history.push('/login')
      }
    }, [user, history])

    useEffect(() => {
      if(successUpdate){
        history.push('/cancelledleads')
      }
    },[successUpdate])

    useEffect(()=>{
    }, [mainProject, subProject])

    useEffect(() => {
      dispatch(projects())
      dispatch(consultantList())
      // dispatch(managers())
      // dispatch(teamLeads())
    },[])
  
    useEffect(() => {
     
      if (!cancelledLeadInfo || cancelledLeadInfo._id !== cancelledLeadId) {
        dispatch(fetchCancelledLeadDetails(cancelledLeadId))
      }else{ 
        setCreatedUser(cancelledLeadInfo.createdUser)
        setAssignedConsultant(cancelledLeadInfo.assignedConsultant)
        setConsultant(cancelledLeadInfo.consultantName)
        setCustomer(cancelledLeadInfo.customerName)
        setEnquiryDate(cancelledLeadInfo.enquiryDate)
        setContactNumber(cancelledLeadInfo.contactNumber)
        setMainProject(cancelledLeadInfo.project.mainProject)
        setSubProject(cancelledLeadInfo.project.subProject)
        setProjectId(cancelledLeadInfo.project.projectId)
        setLeadType(cancelledLeadInfo.leadType)
        setLeadScore(cancelledLeadInfo.leadScore)
        setStatus(cancelledLeadInfo.status)
        setRemarks(cancelledLeadInfo.remarks)
        setNextFollow(cancelledLeadInfo.nextFollowUp)
        setManagerRemarks(cancelledLeadInfo.managerRemarks)
        setFirstInstallment(cancelledLeadInfo.payment.firstInstallment)
        setSecondInstallment(cancelledLeadInfo.payment.secondInstallment)
        setThirdInstallment(cancelledLeadInfo.payment.thirdInstallment)
        setTotalSqft(cancelledLeadInfo.totalSqft? cancelledLeadInfo.totalSqft : 0)
        setRefundStatus(cancelledLeadInfo.refundStatus)
      }
    }, [dispatch, cancelledLeadInfo, successUpdate])

    

    function findSubProject(project) {
      return project.mainProject === mainProject
    }

    useEffect(()=>{
      if(mainProject){
        if(projectInfo)
        {
          const main = projectInfo.findIndex(findSubProject);
        setIndex(main)

      }
      }
    },[mainProject])

    // const subProjectHandler = () => {
    //   if(projectInfo)
    //   {
    //     const main = projectInfo.findIndex(findSubProject);
    //   setIndex(main)
    // }
      
    // }

    // useEffect(()=>{
    //   subProjectHandler()
    // }, [mainProject])

    const consultantHandler = (e) => {
      //  console.log(e.target.value, consultantList)
      // console.log(e.target.value._id)
      setAssignedConsultant(consultantsList[e.target.value]._id)
        setConsultant(consultantsList[e.target.value].name)
     }

     const deleteHandler = (e) => {
       e.preventDefault()
      if (window.confirm('Are you sure?')){
      dispatch(deleteCancelledLead(cancelledLeadId))
      }
     }


    const submitHandler = (e) => {
      e.preventDefault()
        dispatch(
          updateCancelledLeadData({
            _id: cancelledLeadId,
            createdUser,
            assignedConsultant,
            customerName:customer,
            consultantName:consultant,
            enquiryDate,
            contactNumber,
            project: {
              mainProject: mainProject,
              subProject: subProject,
              projectId: projectId
            },
            leadScore,
            leadType,
            status,
            remarks,
            managerRemarks,
            nextFollowUp:nextFollow,
            payment:{
              firstInstallment: firstInstallment,
              secondInstallment: secondInstallment,
              thirdInstallment: thirdInstallment
            },
            totalSqft, 
            cancellation : false,
            refundStatus
          }))
    }

    const projectHandler = (e) => {
      setMainProject(e.target.value)
    }

    const retrieveHandler = (e, id) => {
      e.preventDefault()
      if (window.confirm('Are you sure')) {
          dispatch(addLeadData({
            _id: cancelledLeadId,
            createdUser,
            assignedConsultant,
            customerName:customer,
            consultantName: consultant,
            enquiryDate,
            contactNumber,
            project: {
              mainProject: mainProject,
              subProject: subProject,
              projectId: projectId
            },
            leadScore,
            leadType,
            status,
            remarks,
            managerRemarks,
            nextFollowUp:nextFollow,
            payment:{
              firstInstallment: firstInstallment,
              secondInstallment: secondInstallment,
              thirdInstallment: thirdInstallment
            },
            totalSqft,
            cancellation : true
          }))
          dispatch(deleteCancelledLead(cancelledLeadId)) 
          history.push('/cancelledleads')
        }

  }


  return (
    <>
    { loading && loadingProject ? (<Preloader />) : error? (<p>{error}</p>) :(
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Lead information</h5>
        <Form onSubmit={(e)=>submitHandler(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="customer">
                <Form.Label>Customer</Form.Label>
                <Form.Control required type="text" placeholder="Enter customer name" value={customer || ''} onChange={(e) => setCustomer(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Enquiry Date</Form.Label>
                <Form.Control required type="datetime-local" placeholder="Enter Enquiry Date" defaultValue={enquiryDate.split('.')[0]}  onChange={(e) => {setEnquiryDate(e.target.value)}}/>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
          
            <Col md={6} className="mb-3">
              <Form.Group id="contact">
                <Form.Label>Contact no.</Form.Label>
                <Form.Control required type="tel" placeholder="987654321" value={contactNumber || ''} onChange={(e) => setContactNumber(e.target.value)}/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="consultant">
              <Form.Label>Assign to Consultant</Form.Label>
                <Form.Select value={consultantsList && consultantsList.findIndex(c=>c.name===consultant)} onChange={(e) => consultantHandler(e)}>
                  <option key={300} value="">Select</option>
                 
                  {
                    consultantsList && (consultantsList.map((consultant, i) => {
                      return (
                        <option key ={i} value={i}>{consultant.name}</option>
                      )
                    }))
                  }
                  
                </Form.Select>
              </Form.Group>
            </Col>
            </Row>

            <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="project">
                <Form.Label>Project</Form.Label>
                <Form.Select value={mainProject? mainProject : ''} onChange={(e) => projectHandler(e)}>
                <option key ={99999} value={''}>Select</option>
                  {
                    projectInfo && (projectInfo.map((pro, i) => {
                      return (
                        <option key ={i} value={pro.mainProject}>{pro.mainProject}</option>
                      )
                    }))
                  }
                  
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="subProject">
                <Form.Label>Sub Project</Form.Label>
                <Form.Select value={subProject} onChange={(e) => setSubProject(e.target.value)}>
                  <option key ={99999} value={''}>Select</option>
                  {
                    projectInfo && projectInfo[index] && (projectInfo[index].subProject.map((pro, i) => {
                      return (
                        <option key ={i} value={pro}>{pro}</option>
                      )
                    }))
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Lead Score</Form.Label>
                <Form.Control required type="text" placeholder="Lead Score" value={leadScore || ''} onChange={(e) => setLeadScore(e.target.value)}/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="leadType">
                <Form.Label>LEAD TYPE</Form.Label>
                <Form.Select value={leadType || ''} onChange={(e) => setLeadType(e.target.value)}>
                  <option value="Hot">Hot</option>
                  <option value="Cold">Cold</option>
                  <option value="Warm">Warm</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>STATUS</Form.Label>
                <Form.Select value={status || ''} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Yet to Visit">Yet to Visit</option>
                    <option value="Visited">Visited</option>
                    <option value="Visit Confirmed">Visit Confirmed</option>
                    <option value="Detail Shared">Detail Shared</option>
                    <option value="Lost">Lost</option>
                    <option value="Booked">Booked</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Remarks</Form.Label>
                <Form.Control type="text" placeholder="Remarks" value={remarks || ''} onChange={(e) => setRemarks(e.target.value)}/>
              </Form.Group>
            </Col>                      
         </Row>

         <Row>  
         <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Next Follow Up Date</Form.Label>
                <Form.Control required type="datetime-local" placeholder="Next Follow Up Date" min={enquiryDate} defaultValue={nextFollow.split('.')[0]} onChange={(e) => setNextFollow(e.target.value)}/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Manager Remarks</Form.Label>
                <Form.Control type="text" placeholder="Manager Remarks" value={managerRemarks || ''} onChange={(e) => setManagerRemarks(e.target.value)}/>
              </Form.Group>
            </Col> 
          </Row>

         <Row>
          <h6 className="mb-4">Payment</h6>
            <Col md={4} className="mb-3">
            <Form.Group id="firstInstallment">
                <Form.Label>1st Installment</Form.Label>
                  <Form.Control required type="number" placeholder="1st Installment" value={firstInstallment} onChange={(e) => setFirstInstallment(firstInstallment = parseInt(e.target.value || 0))}/>
                </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="secondInstallment">
                <Form.Label>2nd Installment</Form.Label>
                  <Form.Control required type="number" placeholder="2nd Installment" value={secondInstallment} onChange={(e) => setSecondInstallment(secondInstallment = parseInt(e.target.value || 0))}/>
                </Form.Group>
            </Col>                                 
            <Col md={4} className="mb-3">
            <Form.Group id="thirdInstallment">
                <Form.Label>3rd Installment</Form.Label>
                  <Form.Control required type="number" placeholder="3rd Installment" value={thirdInstallment} onChange={(e) => setThirdInstallment(thirdInstallment = parseInt(e.target.value ) || 0)}/>
                </Form.Group>
            </Col>
         </Row>

         <Row>
          <h6 className="mb-4">Payment</h6>                               
            <Col md={6} className="mb-3">
            <Form.Group id="totalsqft">
                <Form.Label>Total Sqft</Form.Label>
                  <Form.Control required type="number" placeholder="Total Sqft" value={totalSqft} onChange={(e) => setTotalSqft(e.target.value)}/>
                </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="leadType">
                <Form.Label>Refund Status</Form.Label>
                <Form.Select value={refundStatus} onChange={(e) => setRefundStatus(e.target.value)}>
                  {/* <option value="">Select</option> */}
                  <option value="no">Not Refunded</option>
                  <option value="yes">Refunded</option>
                  <option value="initiated">Refund Initiated</option>
                </Form.Select>
              </Form.Group>
            </Col>
         </Row>

          <div className="mt-3 d-flex justify-content-between">
            <div>
            <Button variant="primary" type="submit">Save</Button>
            <Button className="ms-3"  variant="primary" type="button" onClick = {(e)=>retrieveHandler(e, cancelledLeadId)}>Retrieve</Button>
            </div>
            <div>
            <Button variant ="danger" onClick={(e)=>{deleteHandler(e)}}>Delete</Button>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  
    )}
    </>
  );
};
