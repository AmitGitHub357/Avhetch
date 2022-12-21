import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
// import moment from "moment-timezone";
// import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';

import { addUser } from "./../actions/userActions";
import { projects } from "../actions/projectActions";
import Preloader from "../components/Preloader";



export default ({history}) => {
    const [userData, setUserData] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [empCode, setEmpCode] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    // const [mainProject, setMainProject] = useState('')
    // const [projectId, setProjectId] = useState('')
 
    

    const dispatch = useDispatch()

    const addConsultant = useSelector((state) => state.addConsultant)
    const { loading, error, userInfo } = addConsultant

    // const Projects = useSelector((state) => state.fetchProjects)
    // const { loading: loadingProject, error: errorProject , projectInfo } = Projects
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: user } = userLogin

    useEffect(()=>{
      if (user && user.isAdmin) {
       
      } else {
        history.push('/login')
      }
    }, [user, history])
  
  
    useEffect(() => {
      if (userInfo) {
        history.push('/')
      }
    }, [history, userData])

    // useEffect(() => {
    //   if(projectInfo){
    //   setMainProject(projectInfo[0].mainProject)
    //   setProjectId(projectInfo[0].projectId)
    //   }
    // }, [projectInfo])
  
    const submitHandler = (e) => {
        e.preventDefault()
        setUserData(
            userData.name = name, 
            userData.email = email,
            userData.empCode= empCode,
            userData.mobile= mobile,
            userData.password= password,
            userData.role= "LGA",
            userData.manager= "null",
            userData.teamLead= "null",
            userData.asm= "null",
            userData.cpm= "null",
            userData.isAdmin= "false",
            userData.project={
              mainProject : "null",
              projectId : "null"
          },
          userData.setMilestone={
            bookings : 0,
            leads : 0,
            siteVisits: 0
        }
        )
        dispatch(addUser(userData))
        window.location.reload();
    }

    // const projectHandler = (e) => {
    //   console.log(e)
    //   setMainProject(e.mainProject)
    //   setProjectId(e.projectId)
    //   console.log(mainProject, projectId)
    // }


  return (
    <>
    { loading ? (<Preloader />) : error? (<p>{error}</p>) :(
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form onSubmit={submitHandler}>
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
                <Form.Control required type="number" placeholder="+12-345 678 910" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            
            <Col md={6} className="mb-3">
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
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
