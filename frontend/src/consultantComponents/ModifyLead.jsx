import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import Preloader from "../components/Preloader";


import {fetchleadDetails, updateLeadData, deleteLead } from "./../actions/leadActions";
import { projects } from "./../actions/projectActions";
import { addCancelLeadData } from "../actions/cancellationLeadActions";
import { consultantList } from "../actions/userActions";



export default ({match, history}) => {
    const leadId = match.params.id

    var gapi = window.gapi

    var CLIENT_ID = "1013896874235-1htic5jfq2uhg6s8kjt7130t98a0kd86.apps.googleusercontent.com"
    var API_KEY = "AIzaSyBoJQl0S2P5iI5LxS4FQThPKm8b5rVagwc"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const [createdUser, setCreatedUser] = useState('')
    const [assignedUser, setAssignedUser] = useState('')
    const [consultant, setConsultant] = useState('')
    const [enquiryDate, setEnquiryDate] = useState('')
    const [customer, setCustomer] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [alternateNumber, setAlternateNumber] = useState('')
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
    const [remainder, setRemainder] = useState(false)
    

    const dispatch = useDispatch()

    const leadDetails = useSelector((state) => state.leadDetails)
    const { loading, error, leadInfo } = leadDetails

    const updateLead = useSelector((state) => state.updateLead)
    const { loading: loadingUpdate, error: errorUpdate , success: successUpdate } = updateLead

    const Projects = useSelector((state) => state.fetchProjects)
    const { loading: loadingProject, error: errorProject , projectInfo } = Projects

    const fetchConsultants = useSelector((state) => state.fetchConsultants)
    const { loading: loadingConsultants, error: errorConsultants, consultants: consultantsList } = fetchConsultants

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.role === 'Consultant') {
       
      } else {
        history.push('/login')
      }
    }, [user, history])


    useEffect(() => {
      if(successUpdate){
        history.push('/consultant/leads')
      }
    },[successUpdate])

    useEffect(()=>{
    }, [mainProject, subProject])

    useEffect(() => {
      dispatch(projects())
      dispatch(consultantList())
    },[])
  
    useEffect(() => {
     
      if (!leadInfo || leadInfo._id !== leadId) {
        dispatch(fetchleadDetails(leadId))
      }else{ 
        setCreatedUser(leadInfo.createdUser)
        setAssignedUser(leadInfo.assignedConsultant)
        setConsultant(leadInfo.consultantName)
        setCustomer(leadInfo.customerName)
        setEnquiryDate(leadInfo.enquiryDate)
        setContactNumber(leadInfo.contactNumber)
        setAlternateNumber(leadInfo.alternateNumber)
        setMainProject(leadInfo.project.mainProject)
        setSubProject(leadInfo.project.subProject)
        setProjectId(leadInfo.project.projectId)
        setLeadType(leadInfo.leadType)
        setLeadScore(leadInfo.leadScore)
        setStatus(leadInfo.status)
        setRemarks(leadInfo.remarks)
        setNextFollow(leadInfo.nextFollowUp)
        setManagerRemarks(leadInfo.managerRemarks)
        setFirstInstallment(leadInfo.payment.firstInstallment)
        setSecondInstallment(leadInfo.payment.secondInstallment)
        setThirdInstallment(leadInfo.payment.thirdInstallment)
        setTotalSqft(leadInfo.totalSqft? leadInfo.totalSqft : 0)
        setRemainder(leadInfo.remainder? leadInfo.remainder : false)
      }
    }, [dispatch, leadInfo, successUpdate])

    

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



    const consultantHandler = (e) => {
      setAssignedUser(consultantsList[e.target.value].consultantId)
        setConsultant(consultantsList[e.target.value].name)
     }

     const deleteHandler = (e) => {
       e.preventDefault()
      if (window.confirm('Are you sure?')){
      dispatch(deleteLead(leadId))
      }
     }


    const submitHandler = (e) => {
      e.preventDefault()
        dispatch(
          updateLeadData({
            _id: leadId,
            createdUser,
            assignedConsultant: assignedUser,
            customerName:customer,
            consultantName:consultant,
            enquiryDate,
            contactNumber,
            alternateNumber,
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
            remainder
          }))
    }

    const projectHandler = (e) => {
      setMainProject(e.target.value)
    }

  //   const cancelLeadHandler = (e, id) => {
  //     e.preventDefault()
  //     if (window.confirm('Are you sure')) {
  //         dispatch(addCancelLeadData({
  //           _id: leadId,
  //           createdUser,
  //           assignedConsultant: assignedUser,
  //           customerName:customer,
  //           consultantName: consultant,
  //           enquiryDate,
  //           contactNumber,
  //           alternateNumber,
  //           project: {
  //             mainProject: mainProject,
  //             subProject: subProject,
  //             projectId: projectId
  //           },
  //           leadScore,
  //           leadType,
  //           status,
  //           remarks,
  //           managerRemarks,
  //           nextFollowUp:nextFollow,
  //           payment:{
  //             firstInstallment: firstInstallment,
  //             secondInstallment: secondInstallment,
  //             thirdInstallment: thirdInstallment
  //           },
  //           totalSqft, 
  //           cancellation : true
  //         }))
  //         dispatch(deleteLead(leadId)) 
  //         history.push('/leads')
  //       }

  // }

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      // console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': leadInfo.customerName,
          'location': '',
          'description': leadInfo.project.subProject,
          'start': {
            'dateTime': new Date(nextFollow).toISOString().replace('Z',''),
            'timeZone': 'Asia/Kolkata'
          },
          'end': {
            'dateTime': new Date(nextFollow).toISOString().replace('Z',''),
            'timeZone': 'Asia/Kolkata'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
          ],
          'attendees': [
            {'email': 'deve.metromindz@gmail.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })

      })
    })
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
                <Form.Control required type="text" placeholder="Enter customer name" value={customer || ''} onChange={(e) => setCustomer(e.target.value)} disabled/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Enquiry Date</Form.Label>
                <Form.Control required type="datetime-local" placeholder="Enter Enquiry Date" defaultValue={enquiryDate.split('.')[0]}  onChange={(e) => {setEnquiryDate(e.target.value)}} disabled/>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
          
            <Col md={6} className="mb-3">
              <Form.Group id="contact">
                <Form.Label>Contact no.</Form.Label>
                <Form.Control required type="tel" placeholder="987654321" value={contactNumber || ''} onChange={(e) => setContactNumber(e.target.value)} disabled/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="tel">
                <Form.Label>Alternate no.</Form.Label>
                <Form.Control min="10" max="12" type="tel" placeholder="987654321" value={alternateNumber} onChange={(e) => setAlternateNumber(e.target.value)} disabled/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="consultant">
              <Form.Label>Assign to Consultant</Form.Label>
                <Form.Select value={consultantsList && consultantsList.findIndex(c=>c.name===consultant)} onChange={(e) => consultantHandler(e)} disabled>
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

            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Remarks</Form.Label>
                <Form.Control  type="text" placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
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
                <Form.Label>Lead Source</Form.Label>
                <Form.Control required type="text" placeholder="Lead Source" value={leadScore || ''} onChange={(e) => setLeadScore(e.target.value)}/>
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
                    <option value="Not Interested">Not Interested</option>
                    <option value="RFR">RFR</option>
                    <option value="Booked">Booked</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Next Follow Up Date</Form.Label>
                <Form.Control required type="datetime-local" placeholder="Next Follow Up Date" min={enquiryDate} defaultValue={nextFollow.split('.')[0]} onChange={(e) => setNextFollow(e.target.value)}/>
              </Form.Group>
            </Col>                     
         </Row>

         <Row>  
        

            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Manager Remarks</Form.Label>
                <Form.Control type="text" placeholder="Manager Remarks" value={managerRemarks || ''} onChange={(e) => setManagerRemarks(e.target.value)} disabled/>
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
            <Col md={4} className="mb-3">
            <Form.Group id="totalsqft">
                <Form.Label>Total Sqft</Form.Label>
                  <Form.Control required type="number" placeholder="Total Sqft" value={totalSqft} onChange={(e) => setTotalSqft(e.target.value)}/>
                </Form.Group>
            </Col>
         </Row>

          <div className="mt-3 d-flex justify-content-between">
            <div>
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="primary" className="ms-3" type="submit" onClick={handleClick}>Remainder</Button>
            {/* <Button className="ms-3"  variant="primary" type="button" onClick = {(e)=>cancelLeadHandler(e, leadId)}>Cancellation</Button> */}
            </div>
            {/* <div>
            <Button variant ="danger" onClick={(e)=>{deleteHandler(e)}}>Delete</Button>
            </div> */}
          </div>
        </Form>
      </Card.Body>
    </Card>
  
    )}
    </>
  );
};
