import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';

import { managerList, teamLeadList, asmList, consultantList } from "./../actions/userActions";
import { addLeadData} from "./../actions/leadActions";
import { projects } from "./../actions/projectActions";
import Preloader from "../components/Preloader";


export default ({history}) => {
    const [lead, setLead] = useState({})
    const [createdUser, setCreatedUser] = useState('6123336fd4513a227cbd96f3')
    const [assignedUser, setAssignedUser] = useState('6123336fd4513a227cbd96f3')
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

    const fetchProjects = useSelector((state) => state.fetchProjects)
    const { loading: loadingProject, error: errorProject , projectInfo } = fetchProjects

    const fetchConsultants = useSelector((state) => state.fetchConsultants)
    const { loading: loadingConsultants, error: errorConsultants, consultants: consultantsList } = fetchConsultants

    // const fetchManagers = useSelector((state) => state.fetchManagers)
    // const { loading: loadingManager, error: errorManager, managers: managersList } = fetchManagers

    // const fetchTeamLeads = useSelector((state) => state.fetchTeamLeads)
    // const { loading: loadingTeamLead, error: errorTeamLead, teamleads: teamleadsList } = fetchTeamLeads

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.role === 'TeamLead') {
       
      } else {
        history.push('/login')
      }
    }, [user, history])
  
    useEffect(() => {
      dispatch(projects())
      dispatch(consultantList())
      // dispatch(managers())
      // dispatch(teamLeads())
    },[])

    useEffect(()=>{
      if(projectInfo){
        setMainProject(projectInfo[0].mainProject)
        setProjectId(projectInfo[0].projectId)
        setSubProject(projectInfo[0].subProject[0])
        setStatus('Yet to Visit')
        setLeadType('Hot')
        console.log(mainProject, subProject)
      }
    }, [dispatch, projectInfo])

    const submitHandler = (e) => {
      e.preventDefault()  
      setLead(
        lead.createdUser = createdUser, 
        lead.assignedConsultant = assignedUser,
        lead.consultantName= consultant,
        lead.enquiryDate= enquiryDate,
        lead.customerName= customer,
        lead.contactNumber= contactNumber,
        lead.alternateNumber= alternateNumber,
        lead.project ={
          mainProject: mainProject,
          subProject: subProject,
          projectId: projectId
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

    const projectHandler = () => {
      if(projectInfo){
      const i = projectInfo.findIndex((element,i) => {
        if (element.mainProject === mainProject){
          // console.log(i)
          setProjectId(element._id)
        return true
        }
      })
      setIndex(i);  
      
      }      
    }

    useEffect(()=> {
      projectHandler()
   }, [mainProject])

   const consultantHandler = (e) => {
    //  console.log(e.target.value, consultantList)
    // console.log(e.target.value._id)
    setAssignedUser(consultantsList[e.target.value]._id)
      setConsultant(consultantsList[e.target.value].name)
   }

    // useEffect(()=>{
    //   console.log("hello1")
    //   if(customer){
    //     console.log("hello2")
    //     dispatch(addLeadData(lead))
    //         console.log(lead)
    //         console.log(`3${mainProject}`)
    //   }
    // }, [ dispatch])


  

    // const submitHandler = ()=>{
    //   console.log(mainProject, subProject)
    // }

    // const findSubProject = (element, i) => {
    //   console.log(`${element.mainProject} = ${mainProject}`)
    //   if (element.mainProject === mainProject){
    //     return true
    //   }else{
    //     return false
    //   }
    // }

    


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
              <Form.Group id="tel">
                <Form.Label>Alternate no.</Form.Label>
                <Form.Control min="10" max="12" required type="tel" placeholder="987654321" value={alternateNumber} onChange={(e) => setAlternateNumber(e.target.value)}/>
              </Form.Group>
            </Col>

           

            <Col md={6} className="mb-3">
              <Form.Group id="consultant">
              <Form.Label>Assign to Consultant</Form.Label>
                <Form.Select defaultValue={consultant ? consultant : ' '} onChange={(e) => consultantHandler(e)}>
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
                <Form.Select required defaultValue={mainProject? mainProject : 'Not Found'} onChange={(e) => setMainProject(e.target.value)}>
                <option key={2001} value=''>Select</option>
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
                  <Form.Select required defaultValue={subProject? subProject : 'Not Found'} onChange={(e) => setSubProject(e.target.value)}>
                    <option key={2001} value=''>Select</option>
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
                <Form.Label>Lead Scource</Form.Label>
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
                <Form.Control type="text" placeholder="Manager Remarks" value={managerRemarks} onChange={(e) => setManagerRemarks(e.target.value)}/>
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
