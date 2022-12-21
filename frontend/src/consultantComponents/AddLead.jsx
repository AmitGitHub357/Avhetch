import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';

import { managerList, teamLeadList, asmList, consultantsUnderManager } from "./../actions/userActions";
import { addLeadData} from "./../actions/leadActions";
import { getProjectDetails } from "./../actions/projectActions";
import Preloader from "../components/Preloader";


export default ({history}) => {
    const [lead, setLead] = useState({})
    const [consultant, setConsultant] = useState('')
    const [enquiryDate, setEnquiryDate] = useState('')
    const [customer, setCustomer] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [alternateNumber, setAlternateNumber] = useState('')
    // var [projectData, setProjectData] = useState({
    //   mainProject: "",
    //   subporject: "",
    //   projectId: ""
    // })
    const [mainProject, setMainProject] = useState('')
    const [subProject, setSubProject] = useState('')
    const [projectId, setProjectId] = useState('')
    const [leadScore, setLeadScore] = useState('')
    const [leadType, setLeadType] = useState('')
    const [status, setStatus] = useState('')
    const [remarks, setRemarks] = useState('')
    const [nextFollow, setNextFollow] = useState('')
    const [managerRemarks, setManagerRemarks] = useState('')
    const [booked, setBooked] = useState(false)
    // const [payment, setPayment] = useState({
    //   firstInstallment: 0,
    //   secondInstallment: 0,
    //   thirdInstallment: 0
    // })
    var [firstInstallment, setFirstIntallment] = useState(0)
    var [secondInstallment, setSecondIntallment] = useState(0) 
    var [thirdInstallment, setThirdIntallment] = useState(0)
    const [totalSqft, setTotalSqft] = useState(0)
    const [teamLead, setTeamLead] = useState('')
    const [index, setIndex] = useState(0);
    const [manager, setManager] = useState('');
    

    const dispatch = useDispatch()

    const addLead = useSelector((state) => state.addLead)
    const { loading, error, leadInfo } = addLead

    const projectDetails = useSelector((state) => state.projectDetails)
    const { loading: loadingProject, error: errorProject , projectInfo } = projectDetails



    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.role === 'Consultant') {
        console.log(user)
        if(user.projectId){
        dispatch(getProjectDetails(user.projectId))
        }
      } else {
        history.push('/login')
      }
    }, [user, history])

    useEffect(()=>{
      if(projectInfo){
        console.log(55, projectInfo)
        setMainProject(projectInfo.mainProject)
        setProjectId(projectInfo.projectId)
        setSubProject(projectInfo.subProject[0])
        setStatus('Yet to Visit')
        setLeadType('Hot')
      }
    }, [dispatch, projectInfo])

    console.log(mainProject, subProject)

    const submitHandler = (e) => {
      e.preventDefault()  
      setLead(
        lead.createdUser = user._id, 
        lead.assignedConsultant = user.consultantId,
        lead.consultantName= user.name,
        lead.enquiryDate= enquiryDate,
        lead.customerName= customer,
        lead.contactNumber= contactNumber,
        lead.alternateNumber= alternateNumber,
        lead.project ={
          mainProject: mainProject,
          subProject: subProject,
          projectId: user.project
        },
        lead.leadScore= leadScore,
        lead.leadType= leadType,
        lead.status= status,
        lead.remarks= remarks,
        lead.nextFollowUp= nextFollow,
        lead.managerRemarks= managerRemarks,
        lead.booked= booked,
        lead.payment = {
          firstInstallment: firstInstallment,
          secondInstallment: secondInstallment,
          thirdInstallment: thirdInstallment,
        },
        lead.totalSqft= totalSqft
        )
      dispatch(addLeadData(lead))
      history.push('/leads')
  }

    


  return (
    <>
    { loading ? (<Preloader />) : error? (<p>{error}</p>) :(
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Lead information</h5>
        <Form onSubmit={(e) =>submitHandler(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="customer">
                <Form.Label>Customer</Form.Label>
                <Form.Control required type="text" placeholder="Enter customer name" value={customer} onChange={(e) => setCustomer(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Enquiry Date</Form.Label>
                <Form.Control required type="datetime-local" placeholder="Enter Enquiry Date" value={enquiryDate} onChange={(e) => setEnquiryDate(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
        
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="tel">
                <Form.Label>Contact no.</Form.Label>
                <Form.Control min="10" max="12" required type="tel" placeholder="987654321" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="mob">
                <Form.Label>Alternate no.</Form.Label>
                <Form.Control min="10" max="12" type="tel" placeholder="987654321" value={alternateNumber} onChange={(e) => setAlternateNumber(e.target.value)}/>
              </Form.Group>
            </Col>

           

            <Col md={6} className="mb-3">
              <Form.Group id="consultant">
              <Form.Label>Assign to Consultant</Form.Label>
              <Form.Control type="text" placeholder="Assigned Consultant" value={user && user.name} disabled/>
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
                <Form.Control type="text" placeholder="No Project" value={mainProject} disabled/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="subProject">
                  <Form.Label>Sub Project</Form.Label>
                  <Form.Select required defaultValue={subProject? subProject : 'Not Found'} onChange={(e) => setSubProject(e.target.value)}>
                    <option key={2001} value=''>Select</option>
                  {
                      projectInfo  && (projectInfo.subProject.map((pro, i) => {
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
                <Form.Control required type="text" placeholder="Lead Source" value={leadScore} onChange={(e) => setLeadScore(e.target.value)}/>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="leadType">
                <Form.Label>Lead Type</Form.Label>
                <Form.Select required value={leadType} onChange={(e) => setLeadType(e.target.value)}>
                  <option value="Hot">Hot</option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select required value={status} onChange={(e) => setStatus(e.target.value)}>
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
                <Form.Control required type="datetime-local" placeholder="Next Follow Up Date" value={nextFollow} min={enquiryDate} onChange={(e) => setNextFollow(e.target.value)}/>
              </Form.Group>
            </Col>
                                 
         </Row>

         <Row>

        
            

            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Manager Remarks</Form.Label>
                <Form.Control type="text" placeholder="Manager Remarks" value={managerRemarks} onChange={(e) => setManagerRemarks(e.target.value)} disabled/>
              </Form.Group>
            </Col>                      
         </Row>

          <Row>
          <h6 className="mb-4">Payment</h6>
            <Col md={4} className="mb-3">
            <Form.Group id="firstInstallment">
                <Form.Label>1st Installment</Form.Label>
                  <Form.Control required type="number" placeholder="1st Installment" value={firstInstallment} onChange={(e) => setFirstIntallment(e.target.value && (firstInstallment = parseInt(e.target.value)))}/>
                </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="secondInstallment">
                <Form.Label>2nd Installment</Form.Label>
                  <Form.Control required type="number" placeholder="2nd Installment" value={secondInstallment} onChange={(e) => setSecondIntallment(secondInstallment = e.target.value)}/>
                </Form.Group>
            </Col>                                 
            <Col md={4} className="mb-3">
            <Form.Group id="thirdInstallment">
                <Form.Label>3rd Installment</Form.Label>
                  <Form.Control required type="number" placeholder="3rd Installment" value={thirdInstallment} onChange={(e) => setThirdIntallment(thirdInstallment = e.target.value)}/>
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

          <div className="mt-3">
            <Button variant="primary" type="submit">Add Lead & Save</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
   )}
   </>
  );
};
