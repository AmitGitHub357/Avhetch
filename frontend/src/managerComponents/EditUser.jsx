import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup, Alert } from '@themesberg/react-bootstrap';
import { useToasts } from "react-toast-notifications";


import {fetchUserDetail, updateUser, managerList, teamLeadsUnderManager} from '../actions/userActions'
import { projects } from "../actions/projectActions";
import { fetchConsultantLeadList } from "../actions/leadActions";
import Preloader from "../components/Preloader";



export default ({history, match}) => {
    const userId = match.params.id
    const d = new Date()

    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [empCode, setEmpCode] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const [underManager, setUnderManager] = useState('')
    // const [underTeamLead, setUnderTeamLead] = useState('')
    const [role, setRole] = useState('')
    const [mainProject, setMainProject] = useState('')
    const [bookingTarget, setBookingTarget] = useState(0)
    const [bookingMonthlyStatus, setBookingMonthlyStatus] = useState(0)
    const [siteVisitsMonthlyStatus, setSiteVisitsMonthlyStatus] = useState(0)
    const [leadMonthlyStatus, setLeadMonthlyStatus] = useState(0)
    const [bookingDailyStatus, setBookingDailyStatus] = useState(0)
    const [siteVisitsDailyStatus, setSiteVisitsDailyStatus] = useState(0)
    const [leadDailyStatus, setLeadDailyStatus] = useState(0)
    
    
    const dispatch = useDispatch()

    const { addToast } = useToasts();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo} = userLogin

    const userDetail = useSelector((state) => state.userDetail)
    const { loading, error, userData} = userDetail

    const fetchManagers = useSelector((state) => state.fetchManagers)
    const { managers } = fetchManagers

    const teamLeads = useSelector((state) => state.teamLeadsUnderManager)
    const { teamleadList: teamlead } = teamLeads
    

    const Projects = useSelector((state) => state.fetchProjects)
    const { loading: loadingProject, error: errorProject , projectInfo } = Projects

    const consultantLeadList = useSelector((state) => state.consultantLeadList)
    const {leadList: consultantLeads } = consultantLeadList

    useEffect(()=>{
      if (userInfo && userInfo.role === 'Manager') {
        dispatch(fetchUserDetail(userId))
        dispatch(fetchConsultantLeadList(userId))

      } else {
        history.push('/login')
      }
    }, [userInfo, history])

    console.log(userData)

    useEffect(()=>{
      if(consultantLeads && consultantLeads.leadsList ){
      setBookingDailyStatus(consultantLeads.leadsList.filter(lead => lead.status === 'booked' && new Date(lead.updatedAt).toISOString().split('T')[0] === d.toISOString().split('T')[0] ).length)
      setSiteVisitsDailyStatus(consultantLeads.leadsList.filter(lead => lead.status === 'visited' && new Date(lead.updatedAt).toISOString().split('T')[0] === d.toISOString().split('T')[0]).length)
      setLeadDailyStatus(consultantLeads.leadsList.filter(lead =>new Date(lead.updatedAt).toISOString().split('T')[0] === d.toISOString().split('T')[0]).length)
      setBookingMonthlyStatus(consultantLeads.leadsList.filter(lead => lead.status === 'booked' && new Date(lead.updatedAt).getFullYear() === d.getFullYear() && new Date(lead.updatedAt).getMonth() === d.getMonth()).length)
      setSiteVisitsMonthlyStatus(consultantLeads.leadsList.filter(lead => lead.status === 'visited' && new Date(lead.updatedAt).getFullYear() === d.getFullYear() && new Date(lead.updatedAt).getMonth() === d.getMonth()).length)
      setLeadMonthlyStatus(consultantLeads.leadsList.filter(lead =>new Date(lead.updatedAt).getFullYear() === d.getFullYear() && new Date(lead.updatedAt).getMonth() === d.getMonth()).length)
      }
    }, [consultantLeads])

    // useEffect(()=>{
    //   if(!managers){
    //     dispatch(managerList())
    //   }
    //   if(underManager){
    //     dispatch(teamLeadsUnderManager(underManager))
    //   }
    //   if(!projectInfo){
    //     dispatch(projects())
    //   }
    //   if(underManager && managers){
    //     const a  = managers.filter(m => m._id === underManager)[0]
    //     setMainProject(a? a.project : null)
    //   }
    // },[underManager, role ])

    useEffect(()=>{
      if(projectInfo){
        setMainProject(projectInfo.filter(project => project._id === mainProject)[0]?projectInfo.filter(project => project._id === mainProject)[0].mainProject : '')
      }else{
        dispatch(projects())
      }
    }, [projectInfo])

    useEffect(()=>{
      if(userData){
        setName(userData.name)
        setEmail(userData.email)
        setMobile(userData.mobile)
        setRole(userData.role)
        setEmpCode(userData.empCode)
        setMainProject(userData.project)
        // setUnderManager(userData.managerId)
        // setUnderTeamLead(userData.teamLeadId)
        setBookingTarget(userData.setMilestone.bookings)
        // setUser(user._id = userData._id)

      }
    },[userData])

    const submitHandler = (e) => {

      e.preventDefault()
      setUser(
        user._id = userData._id,
          user.name = name, 
          user.email = email,
          user.empCode= empCode,
          user.mobile= mobile,
         (password && (password === confirmPassword))?  user.password= password : null,
          user.role= role,
          user.asm= "null",
          user.cpm= "null",
          user.isAdmin= "false",
        user.setMilestone = {
          bookings: bookingTarget,
          leads: bookingTarget * 4,
          siteVisits: bookingTarget * 6
        })
      dispatch(updateUser(user, addToast))
    }

  
  return (
    <>

    { loading ? (<Preloader />) : error? (<Alert>{error}</Alert>) :(
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form onSubmit={(e)=>submitHandler(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Employee Code</Form.Label>
                <Form.Control required type="text" placeholder="Enter your Employee Code" value={empCode} onChange={(e) => setEmpCode(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" minLength={10} maxLength={10} placeholder="Mobile no." value={mobile} onChange={(e) => setMobile(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
          <Col md={6} className="mb-3">
            <Form.Group className="mb-2">
                <Form.Label>Role</Form.Label>
                <Form.Select id="state" value={role} onChange={e=> setRole(e.target.value)} required>
                <option>Select</option>
                  <option value="Manager">Manager</option>
                  <option value="TeamLead">TeamLead</option>
                  <option value="asm">ASM</option>
                  <option value="Consultant">Consultant</option>
                  <option value="cpm">Channel Partner Manager</option>
                  <option value="cp">Channel Partner</option>
                  <option value="lead assigner">Lead Assigner</option>
                </Form.Select>
            </Form.Group>
            </Col>

          <Col md={6} className="mb-3">
            <Form.Group id="project" className="mb-4">
                  <Form.Label>Project</Form.Label>
                  {/* <Form.Select id="state" defaultValue={(mainProject && mainProject.mainProject)? mainProject : "No Project"} onChange={e=> setMainProject(e.target.value)} required disabled={false}>
                  <option>Select</option>
                </Form.Select> */}
                <Form.Control required type="text"  value={mainProject? mainProject.mainProject : "No Project Assigned"} disabled/>
                {/* <p>{(mainProject && mainProject.mainProject)? mainProject : "No Project"}</p> */}
                </Form.Group>
            </Col>
          </Row>

           {/* <Row>
            <Col md={6} className="mb-3">
            <Form.Group id="project" className="mb-4">
                  <Form.Label>Manager</Form.Label>
                  <Form.Select id="state" value={underManager} onChange={e=> setUnderManager(e.target.value)}  disabled={(role==='Consultant' || role==='TeamLead') ? false:true}>
                <option>Select</option>
                <>
                  {managers && managers.map((manager,i)=>{return (<option key={i} value={manager._id}>{manager.name}</option>)})}
                  </>
                </Form.Select>
                </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
            <Form.Group id="project" className="mb-4">
                  <Form.Label>TeamLead</Form.Label>
                  <Form.Select id="state" value={underTeamLead} onChange={e=> setUnderTeamLead(e.target.value)} disabled={role==='Consultant'? false:true}>
                  <option>Select</option>
                  {(teamlead && teamlead.teamLeadsList.length>0) && teamlead.teamLeadsList.map((lead,i)=><option key={i} value={lead.userId._id}>{lead.userId.name}</option>)}
                </Form.Select>
                </Form.Group>
            </Col>
            
            
          </Row>  */}

          <Row>
            <h5 className="mb-4">Set Milestone (monthly)</h5>
            <Col md={4} className="mb-3">
              <Form.Group id="booking">
                <Form.Label>Booking Target</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={bookingTarget} onChange={(e) => setBookingTarget(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="booking">
                <Form.Label>Site Visits Target</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={bookingTarget*4} onChange={(e) => setBookingTarget(e.target.value)} disabled/>
              </Form.Group>
              {/* Site Visits Target : {bookingTarget * 4} */}
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="booking">
                <Form.Label>Lead Generation Target</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={bookingTarget*6} onChange={(e) => setBookingTarget(e.target.value)} disabled/>
              </Form.Group>
              {/* Lead Generation Target : {bookingTarget * 4} */}
            </Col>
          </Row>

          <Row>
            <h5 className="mb-4">Achieved (monthly)</h5>
            <Col md={4} className="mb-3">
              <Form.Group id="booking">
                <Form.Label>Booking Achieved</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={bookingMonthlyStatus}  disabled/>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="booking">
                <Form.Label>Site Visits Achieved</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={siteVisitsMonthlyStatus}  disabled/>
              </Form.Group>
              {/* Site Visits Target : {bookingTarget * 4} */}
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="booking">
                <Form.Label>Lead Generation Achieved</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={leadMonthlyStatus}  disabled/>
              </Form.Group>
              {/* Lead Generation Target : {bookingTarget * 4} */}
            </Col>
          </Row>

          <Row>
            <h5 className="mb-4">Achieved (Daily)</h5>
            <Col md={4} className="mb-3">
              <Form.Group id="booking">
                <Form.Label>Booking Achieved</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={bookingDailyStatus}  disabled/>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="booking">
                <Form.Label>Site Visits Achieved</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={siteVisitsDailyStatus}  disabled/>
              </Form.Group>
              {/* Site Visits Target : {bookingTarget * 4} */}
            </Col>
            <Col md={4} className="mb-3">
            <Form.Group id="booking">
                <Form.Label>Lead Generation Achieved</Form.Label>
                <Form.Control required type="number" min={0} placeholder="0" value={leadDailyStatus}  disabled/>
              </Form.Group>
              {/* Lead Generation Target : {bookingTarget * 4} */}
            </Col>
          </Row>


          <Row className="mt-3">
          <h5 className="mb-4">Change Password</h5>
          <Col md={6} className="mb-3">
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Change Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required = {password? true : false} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
                <p className="alert-message">{password & (password === confirmPassword)? "Password does not match": ''}</p>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">Save</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    )}
    </>
  );
};
